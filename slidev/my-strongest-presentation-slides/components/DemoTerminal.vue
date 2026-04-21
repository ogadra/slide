<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import * as monaco from 'monaco-editor'
import { useBunshinSession } from '../composables/useBunshinSession'
import { useBunshinExecute, type SseEvent } from '../composables/useBunshinExecute'
import Terminal from './Terminal.vue'

const props = withDefaults(defineProps<{
  suggestedCommand?: string
  caption?: string
  rows?: number
}>(), {
  rows: 8,
})

const { sessionReady, sessionError } = useBunshinSession()
const { execute, isExecuting } = useBunshinExecute()

const editorContainer = ref<HTMLDivElement>()
const terminalRef = ref<InstanceType<typeof Terminal>>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  await nextTick()
  const el = editorContainer.value
  if (!el) return

  editor = monaco.editor.create(el, {
    value: props.suggestedCommand ?? '',
    language: 'shell',
    theme: 'vs-dark',
    minimap: { enabled: false },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    scrollBeyondLastLine: false,
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'auto',
      handleMouseWheel: false,
    },
    overviewRulerLanes: 0,
    renderLineHighlight: 'none',
    wordWrap: 'on',
    fontSize: 14,
    fontFamily: 'Fira Code, monospace',
    padding: { top: 6, bottom: 6 },
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

async function handleExecute() {
  if (!sessionReady.value || isExecuting.value || !editor) return

  const command = editor.getValue().trim()
  if (!command) return

  terminalRef.value?.write(`\x1b[38;5;243m$ ${command}\x1b[0m\r\n`)

  await execute(command, (event: SseEvent) => {
    switch (event.type) {
      case 'stdout':
        terminalRef.value?.write(event.data)
        break
      case 'stderr':
        terminalRef.value?.write(`\x1b[38;5;252m${event.data}\x1b[0m`)
        break
      case 'complete':
        if (event.exitCode !== 0) {
          terminalRef.value?.writeln(`\x1b[31mexit code: ${event.exitCode}\x1b[0m`)
        }
        break
    }
  })
}
</script>

<template>
  <div class="demo-terminal-container">
    <div v-if="!sessionReady" class="connecting">
      <span v-if="sessionError" class="error">{{ sessionError }}</span>
      <span v-else>Connecting to container...</span>
    </div>
    <template v-else>
      <div ref="editorContainer" class="monaco-editor-container" />
      <button
        class="run-button"
        :disabled="isExecuting"
        @click="handleExecute"
      >
        {{ isExecuting ? '⏳ 実行中...' : '▶ 実行' }}
      </button>
      <Terminal ref="terminalRef" :rows="rows" :font-size="14" />
    </template>
    <p v-if="caption" class="caption">{{ caption }}</p>
  </div>
</template>

<style scoped>
.demo-terminal-container {
  max-width: 850px;
  margin: 0.5rem auto 0;
}

.connecting {
  text-align: center;
  color: #888;
  padding: 2rem 0;
  font-size: 1.1rem;
}

.connecting .error {
  color: #ff6b6b;
}

.monaco-editor-container {
  height: 32px;
  border: 1px solid rgba(78, 201, 176, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.run-button {
  display: block;
  margin: 0.4rem 0;
  padding: 0.3rem 1.2rem;
  background: #16825d;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.run-button:hover:not(:disabled) {
  background: #1a9e6f;
}

.run-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.caption {
  text-align: center;
  margin-top: 0.4rem;
  color: #ff6b6b;
  font-size: 1.1rem !important;
}
</style>
