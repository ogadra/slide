import { onMounted, onUnmounted, ref } from 'vue'

const sessionReady = ref(false)
const sessionError = ref<string | null>(null)
let refCount = 0
let creating = false

const MAX_DELAY_MS = 8000

async function tryCreateSession(delay: number): Promise<void> {
  try {
    const res = await fetch('/bunshin/session', {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) throw new Error(`Failed to create session: ${res.status}`)
    sessionReady.value = true
    sessionError.value = null
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    sessionError.value = message
    console.error('Failed to create bunshin session', err)
    const nextDelay = Math.min(delay * 2, MAX_DELAY_MS)
    setTimeout(() => {
      if (refCount > 0 && !sessionReady.value) {
        void tryCreateSession(nextDelay)
      }
    }, delay)
  }
}

function destroySession(): void {
  void fetch('/bunshin/session', {
    method: 'DELETE',
    credentials: 'include',
    keepalive: true,
  }).catch((err: unknown) => {
    console.error('Failed to delete bunshin session', err)
  })
  sessionReady.value = false
  sessionError.value = null
  creating = false
}

export function useBunshinSession() {
  onMounted(() => {
    refCount++
    if (!creating && !sessionReady.value) {
      creating = true
      void tryCreateSession(1000)
    }
  })

  onUnmounted(() => {
    refCount--
    if (refCount <= 0) {
      refCount = 0
      destroySession()
    }
  })

  return { sessionReady, sessionError }
}
