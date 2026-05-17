<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { type HudTone, hudToneClass } from './utils/hudTone'

const nav = useNav()
const { $slidev } = useSlideContext()
const currentSlideNo = computed(() => $slidev?.nav?.currentSlideNo ?? nav.currentSlideNo.value)
const total = computed(() => $slidev?.nav?.total ?? nav.total.value)

// 全スライド共通のヘッダー（装飾。スライドごとに変えない）
const topStatus: { text: string; tone?: HudTone }[] = [
  { text: '● REC 2026-05-18T18:00 JST' },
  { text: '▲ STATUS: ONLINE', tone: 'green' },
  { text: 'SIGNAL ████████░ 87%' },
  { text: '⚠ WARNING', tone: 'red' },
]

const chapterNo = computed(() => currentSlideNo.value.toString().padStart(2, '0'))
const totalNo = computed(() => total.value.toString().padStart(2, '0'))
const progressPct = computed(() => Math.round((currentSlideNo.value / total.value) * 100))

// スライドごとのメタ情報 (TOPIC / STAGE / NEXT)
const slideMeta: { topic: string; stage: string }[] = [
  { topic: 'INTRO',      stage: 'OPENING' },
  { topic: 'KEYWORDS',   stage: 'INTRO' },
  { topic: 'DEFINITION', stage: 'INTRO' },
  { topic: 'RESOURCE',   stage: 'EXAMPLE' },
  { topic: 'FOR_EACH',   stage: 'EXAMPLE' },
  { topic: 'BENEFITS',   stage: 'CONCLUSION' },
  { topic: 'DECISION',   stage: 'CONCLUSION' },
  { topic: 'THANKS',     stage: 'OUTRO' },
]
const currentMeta = computed(() => slideMeta[currentSlideNo.value - 1] ?? { topic: '-', stage: '-' })
const nextTopic = computed(() => slideMeta[currentSlideNo.value]?.topic ?? '—')
</script>

<template>
  <div class="hud-global">
    <div class="hud-corner tl" />
    <div class="hud-corner tr" />
    <div class="hud-corner bl" />
    <div class="hud-corner br" />

    <div class="hud-statusbar top">
      <span v-for="(item, i) in topStatus" :key="i" :class="hudToneClass(item.tone)">{{ item.text }}</span>
    </div>

    <!-- 左ガター: ドットレール (点反復・5刻みで長い縦線) -->
    <div class="hud-gutter left">
      <div class="hud-dot-rail" />
    </div>

    <!-- 右ガター: ドットレール (点反復・5刻みで長い縦線) -->
    <div class="hud-gutter right">
      <div class="hud-dot-rail" />
    </div>

    <!-- 下部 左: SYSTEM 静的メタ -->
    <HudMetaBlock
      class="hud-meta-system"
      label="SYSTEM"
      :rows="[
        { k: 'BUILD',  v: 'OK' },
        { k: 'REGION', v: 'JP' },
        { k: 'LANG',   v: 'ja-JP' },
      ]"
    />

    <!-- 下部 右 (CHAPTER直前): スライド進行プログレス -->
    <div class="hud-progress-block">
      <div class="hud-progress-head">
        <span class="hud-deco-label">[ PROGRESS ]</span>
        <span class="hud-progress-val">{{ progressPct }}%</span>
      </div>
      <div class="hud-progress-track">
        <div class="hud-progress-fill" :style="{ width: progressPct + '%' }" />
        <div
          v-for="i in (total - 1)"
          :key="`mark-${i}`"
          class="hud-progress-mark"
          :style="{ left: (i / total * 100) + '%' }"
        />
      </div>
    </div>

    <!-- 下部 中央寄り: SESSION 動的メタ -->
    <HudMetaBlock
      class="hud-meta-session"
      label="SESSION"
      :rows="[
        { k: 'TOPIC', v: currentMeta.topic },
        { k: 'STAGE', v: currentMeta.stage },
        { k: 'NEXT',  v: nextTopic },
      ]"
    />

    <!-- 画面下部 中央: 十字マーク -->
    <div class="hud-cross-center">
      <span />
      <span />
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
  bottom: 18px;
  right: 60px;
  padding: 0.45rem 0.9rem;
  border: 1px solid #1a1a1a;
  background: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.hud-chapter-label {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: #1a1a1a;
}
.hud-chapter-no {
  font-weight: 900;
  font-size: 1.65rem;
  line-height: 1;
  letter-spacing: 0.05em;
  color: #1a1a1a;
}
.hud-chapter-total {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  color: #1a1a1a;
}

/* ============================================
   NERV / Wunder 風 装飾
   ============================================ */
.hud-gutter {
  position: absolute;
  top: 50px;
  bottom: 50px;
  width: 3px;
  font-family: var(--font-mono);
  color: #1a1a1a;
}
.hud-gutter.left { left: 16px; }
.hud-gutter.right { right: 16px; }
/* ドットレール: L字延長線上の細い縦点線 + 5番目を長線で強調 */
.hud-dot-rail {
  position: absolute;
  inset: 0;
  background-image:
    /* 60pxごとに12pxの実線 */
    linear-gradient(
      180deg,
      transparent 0,
      transparent calc(50% - 6px),
      rgba(26, 26, 26, 0.85) calc(50% - 6px),
      rgba(26, 26, 26, 0.85) calc(50% + 6px),
      transparent calc(50% + 6px)
    ),
    /* 12pxごとに3pxドット */
    radial-gradient(circle at center, rgba(26, 26, 26, 0.95) 1.5px, transparent 1.8px);
  background-size: 100% 60px, 100% 12px;
  background-position: center, center;
  background-repeat: repeat-y, repeat-y;
}

/* --- 下部 (CHAPTER の対角に配置) --- */
/* MetaBlock の配置 (左=SYSTEM、中央寄り=SESSION) */
.hud-meta-system {
  position: absolute;
  bottom: 18px;
  left: 60px;
  width: 220px;
}
.hud-meta-session {
  position: absolute;
  bottom: 18px;
  left: 320px;
  width: 220px;
}

/* スライド進行プログレス (CHAPTER直前に右寄せ) */
.hud-progress-block {
  position: absolute;
  bottom: 24px;
  right: 320px;
  width: 220px;
  font-family: var(--font-mono);
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hud-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 10px;
  letter-spacing: 0.3em;
  font-weight: 700;
}
.hud-progress-val {
  color: #1a1a1a;
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 0.1em;
}
.hud-progress-track {
  position: relative;
  height: 16px;
  border: 1px solid #1a1a1a;
  background: transparent;
}
.hud-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: #1a1a1a;
}
.hud-progress-mark {
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 1px;
  background: #1a1a1a;
  transform: translateX(-50%);
}

/* 画面下部 中央: 十字マーク (左右中央) */
.hud-cross-center {
  position: absolute;
  bottom: 38px;
  left: 50%;
  width: 14px;
  height: 14px;
  transform: translateX(-50%);
}
.hud-cross-center span {
  position: absolute;
  background: #1a1a1a;
}
.hud-cross-center span:nth-child(1) {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
}
.hud-cross-center span:nth-child(2) {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
}
</style>
