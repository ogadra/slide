<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

const props = defineProps<{
  fontSize: number
}>()

const containerRef = ref<HTMLDivElement>()
let xterm: XTerm | null = null
let fitAddon: FitAddon | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const el = containerRef.value
  if (!el) return

  xterm = new XTerm({
    convertEol: true,
    fontSize: props.fontSize,
    rows: 16,
    theme: {
      background: '#121212',
      foreground: '#D4D4D4',
      cursor: '#4ec9b0',
      selectionBackground: 'rgba(78, 201, 176, 0.3)',
    },
    scrollback: 1000,
    disableStdin: true,
  })

  fitAddon = new FitAddon()
  xterm.loadAddon(fitAddon)
  xterm.open(el)
  fitAddon.fit()

  resizeObserver = new ResizeObserver(() => {
    fitAddon?.fit()
  })
  resizeObserver.observe(el)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  xterm?.dispose()
  xterm = null
  fitAddon = null
  resizeObserver = null
})

function write(data: string): void {
  xterm?.write(data)
}

function writeln(data: string): void {
  xterm?.writeln(data)
}

function clear(): void {
  xterm?.clear()
}

defineExpose({ write, writeln, clear })
</script>

<template>
  <div
    ref="containerRef"
    class="terminal-container"
  />
</template>

<style scoped>
.terminal-container {
  width: 100%;
  border: 1px solid rgba(78, 201, 176, 0.15);
  border-radius: 8px;
  overflow: hidden;
  pointer-events: none;
  box-sizing: border-box;
  background: #121212;
  padding: 4px;
}
</style>
