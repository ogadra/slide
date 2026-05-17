<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo, total } = useNav()

// 全スライド共通のヘッダー（装飾。スライドごとに変えない）
const topStatus: { text: string; tone?: 'green' | 'red' | 'orange' }[] = [
  { text: '● REC 2026-05-18T18:00 JST' },
  { text: '▲ STATUS: ONLINE', tone: 'green' },
  { text: 'SIGNAL ████████░ 87%' },
  { text: '⚠ WARNING', tone: 'red' },
]

const chapterNo = computed(() => currentSlideNo.value.toString().padStart(2, '0'))
const totalNo = computed(() => total.value.toString().padStart(2, '0'))

const toneClass = (tone?: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <div class="hud-global">
    <div class="hud-corner tl" />
    <div class="hud-corner tr" />
    <div class="hud-corner bl" />
    <div class="hud-corner br" />

    <div class="hud-statusbar top">
      <span v-for="(item, i) in topStatus" :key="i" :class="toneClass(item.tone)">{{ item.text }}</span>
    </div>

    <div class="hud-chapter">
      <div class="hud-chapter-label">[ CHAPTER ]</div>
      <div class="hud-chapter-no">{{ chapterNo }}</div>
      <div class="hud-chapter-total">/ {{ totalNo }}</div>
    </div>
  </div>
</template>

<style scoped>
.hud-global {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}
.hud-statusbar.top {
  top: 20px;
}

.hud-chapter {
  position: absolute;
  bottom: 32px;
  right: 60px;
  padding: 0.35rem 0.85rem;
  border: 1px solid #1a1a1a;
  background: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}
.hud-chapter-label {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.3em;
  color: #1a1a1a;
}
.hud-chapter-no {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  color: #1a1a1a;
}
.hud-chapter-total {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.3em;
  color: #1a1a1a;
}
</style>
