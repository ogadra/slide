<script setup lang="ts">
import { computed } from 'vue'

// small は長いワンライナー用。既定の68pxだと1920pxに収まらない
// command に配列を渡すと1要素が1行になる。`\` での折り返しはこちらで書く
const props = defineProps<{
  command: string | string[]
  output?: string
  note?: string
  small?: boolean
}>()

const commandText = computed(() =>
  Array.isArray(props.command) ? props.command.join('\n') : props.command,
)
</script>

<template>
  <div class="command-slide">
    <div class="command-slide__main">
      <div class="command-slide__line" :class="{ 'command-slide__line--small': small }">
        <span class="command-slide__prompt">❯</span>{{ commandText }}
      </div>
      <div class="command-slide__rule" />
      <pre v-if="output" class="command-slide__output">{{ output }}</pre>
      <p v-if="note" class="command-slide__note">{{ note }}</p>
    </div>
  </div>
</template>

<style scoped>
.command-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.command-slide__main {
  width: 100%;
}

.command-slide__line {
  font-family: var(--font-mono);
  font-size: 68px;
  letter-spacing: -0.01em;
  white-space: pre-wrap;
  word-break: break-word;
}

.command-slide__line--small {
  font-size: 52px;
}

.command-slide__prompt {
  color: var(--cyan);
  margin-right: 32px;
}

.command-slide__rule {
  height: 1px;
  background: rgba(86, 225, 245, 0.22);
  margin: 56px 0 40px;
}

.command-slide__output {
  margin: 0 0 32px;
  font-family: var(--font-mono);
  font-size: 34px;
  line-height: 1.6;
  color: var(--paper);
  white-space: pre;
  overflow: hidden;
}

.command-slide__note {
  font-weight: 500;
  font-size: 44px;
  color: var(--mute);
}
</style>
