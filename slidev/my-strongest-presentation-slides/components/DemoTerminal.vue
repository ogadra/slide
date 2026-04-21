<script setup lang="ts">
import type * as Monaco from 'monaco-editor'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useBunshinSession } from '../composables/useBunshinSession'
import { useBunshinExecute, SseEventType, type SseEvent } from '../composables/useBunshinExecute'
import Terminal from './Terminal.vue'

const props = defineProps<{
  suggestedCommand: string
}>()

const FONT_SIZE = 14

const { sessionReady, sessionError } = useBunshinSession()
const { execute, isExecuting } = useBunshinExecute()

const editorContainer = ref<HTMLDivElement>()
const terminalRef = ref<InstanceType<typeof Terminal>>()
const errorMessage = ref<string | null>(null)
let editor: Monaco.editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  await nextTick()
  const el = editorContainer.value
  if (!el) return

  const monaco = await import('monaco-editor')

  if (!window.MonacoEnvironment) {
    const EditorWorker = await import('monaco-editor/esm/vs/editor/editor.worker?worker')
    window.MonacoEnvironment = {
      getWorker: () => new EditorWorker.default(),
    }
  }

  editor = monaco.editor.create(el, {
    value: props.suggestedCommand ?? '',
    language: 'shell',
    theme: 'vs-dark',
    minimap: { enabled: false },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 19,
    lineNumbersMinChars: 0,
    scrollBeyondLastLine: false,
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'auto',
      handleMouseWheel: false,
    },
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    renderLineHighlight: 'none',
    wordWrap: 'on',
    fontSize: FONT_SIZE,
    fontFamily: 'Fira Code, monospace',
    padding: { top: 19, bottom: 19 },
    automaticLayout: true,
  })

  editor.addAction({
    id: 'run-command',
    label: 'Run Command',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
    run: () => handleExecute(),
  })
})

onUnmounted(() => {
  editor?.dispose()
  editor = null
})

const handleExecute = async () => {
  if (!sessionReady.value || isExecuting.value || !editor) return

  const command = editor.getValue().trim()
  if (!command) return

  errorMessage.value = null
  terminalRef.value?.write(`\x1b[38;5;243m$ ${command}\x1b[0m\r\n`)

  try {
    await execute(command, (event: SseEvent) => {
      switch (event.type) {
        case SseEventType.STDOUT:
          terminalRef.value?.write(event.data)
          break
        case SseEventType.STDERR:
          terminalRef.value?.write(`\x1b[38;5;252m${event.data}\x1b[0m`)
          break
        case SseEventType.COMPLETE:
          if (event.exitCode !== 0) {
            terminalRef.value?.writeln(`\x1b[31mexit code: ${event.exitCode}\x1b[0m`)
          }
          break
      }
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    errorMessage.value = message
  }
}
</script>

<template>
  <div class="demo-terminal-container">
    <div class="input-row">
      <div ref="editorContainer" class="monaco-editor-container" />
      <button
        class="run-button"
        :disabled="isExecuting || !sessionReady"
        @click="handleExecute"
      >
        {{ !sessionReady ? '接続中...' : isExecuting ? '実行中...' : '実行' }}
      </button>
    </div>
    <Terminal ref="terminalRef" :font-size="FONT_SIZE" />
    <Teleport to="body">
      <div v-if="errorMessage" class="demo-error-overlay" @click="errorMessage = null">
        <div class="demo-error-content" @click.stop>
          <p class="demo-error-message">{{ errorMessage }}</p>
          <button class="demo-error-close" @click="errorMessage = null">閉じる</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.demo-terminal-container {
  max-width: 850px;
  margin: 0.5rem auto 0;
  min-width: 0;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
  margin-bottom: 0.4rem;
}

.monaco-editor-container {
  flex: 1;
  height: 60px;
  min-width: 0;
  border: 1px solid rgba(78, 201, 176, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.run-button {
  height: 60px;
  box-sizing: border-box;
}

.run-button {
  padding: 0.5rem 1.5rem;
  background: #16825d;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  white-space: nowrap;
  transition: background 0.2s;
}

.run-button:hover:not(:disabled) {
  background: #1a9e6f;
}

.run-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


</style>

<style>
.demo-error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.demo-error-content {
  background: #1e1e1e;
  border: 1px solid rgba(255, 107, 107, 0.4);
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
}

.demo-error-message {
  color: #ff6b6b;
  font-size: 1.1rem !important;
  font-weight: bold;
  margin: 0 0 1.5rem;
}

.demo-error-close {
  padding: 0.5rem 2rem;
  background: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.demo-error-close:hover {
  background: #444;
}
</style>
