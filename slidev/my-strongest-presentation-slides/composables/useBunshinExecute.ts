import { ref } from 'vue'

export type SseEvent =
  | { type: 'stdout'; data: string }
  | { type: 'stderr'; data: string }
  | { type: 'complete'; exitCode: number }

export function useBunshinExecute() {
  const isExecuting = ref(false)

  async function execute(
    command: string,
    onEvent: (event: SseEvent) => void,
    signal?: AbortSignal,
  ): Promise<void> {
    isExecuting.value = true
    try {
      const res = await fetch('/bunshin/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ command }),
        signal,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        const message = body?.error ?? `Failed to execute: ${res.status}`
        throw new Error(message)
      }
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      const chunks: string[] = []

      for (;;) {
        const { done, value } = await reader.read()
        chunks.push(done ? decoder.decode() : decoder.decode(value, { stream: true }))

        const lines = chunks.join('').split('\n')
        chunks.length = 0
        if (!done) chunks.push(lines.pop()!)

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const event = JSON.parse(line.slice(6)) as SseEvent
          onEvent(event)
        }

        if (done) break
      }
    } finally {
      isExecuting.value = false
    }
  }

  return { execute, isExecuting }
}
