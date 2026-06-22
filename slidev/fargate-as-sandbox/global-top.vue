<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const nav = useNav()
const { $slidev } = useSlideContext()
const currentSlideNo = computed(() => $slidev?.nav?.currentSlideNo ?? nav.currentSlideNo.value)
const total = computed(() => $slidev?.nav?.total ?? nav.total.value)

const chapterNo = computed(() => currentSlideNo.value.toString().padStart(2, '0'))
const totalNo = computed(() => total.value.toString().padStart(2, '0'))
const progressPct = computed(() => Math.round((currentSlideNo.value / total.value) * 100))

// 上部の固定ステータスバー (装飾)
type Tone = 'default' | 'ok' | 'hazard' | 'danger' | 'warn'
const topStatus: { text: string; tone?: Tone }[] = [
  { text: '● REC 2026-06-22T19:00 JST' },
  { text: '▲ STATUS: ONLINE', tone: 'ok' },
  { text: 'SIGNAL ████████░ 87%' },
  { text: '⚠ WARNING', tone: 'danger' },
]
const toneClass = (t?: Tone) => {
  switch (t) {
    case 'ok': return 'nerv-tone-ok'
    case 'hazard': return 'nerv-tone-hazard'
    case 'danger': return 'nerv-tone-danger'
    case 'warn': return 'nerv-tone-warn'
    default: return ''
  }
}

// 各スライドのトピック / フェーズ
const slideMeta: { topic: string; stage: string }[] = [
  { topic: 'TITLE',      stage: 'OPENING' },
  { topic: 'DEMO',       stage: 'OPENING' },
  { topic: 'CASE-01',    stage: 'INCIDENT' },
  { topic: 'STATE',      stage: 'INCIDENT' },
  { topic: 'CALLOUT',    stage: 'INCIDENT' },
  { topic: 'STATE',      stage: 'INCIDENT' },
  { topic: 'RESOLUTION', stage: 'SHIPPED' },
  { topic: 'AFTERMATH',  stage: 'SHIPPED' },
  { topic: 'CASE-02',    stage: 'INCIDENT' },
  { topic: 'CALLOUT',    stage: 'INCIDENT' },
  { topic: 'RESOLUTION', stage: 'SHIPPED' },
  { topic: 'AFTERMATH',  stage: 'SHIPPED' },
  { topic: 'CASE-03',    stage: 'INCIDENT' },
  { topic: 'STATE',      stage: 'INCIDENT' },
  { topic: 'BUNSHIN',    stage: 'SHIPPED' },
  { topic: 'AFTERMATH',  stage: 'SHIPPED' },
  { topic: 'AFTERMATH',  stage: 'SHIPPED' },
  { topic: 'SUMMARY',    stage: 'CLOSING' },
  { topic: 'CLOSED',     stage: 'CLOSING' },
]
const currentMeta = computed(() => slideMeta[currentSlideNo.value - 1] ?? { topic: '-', stage: '-' })
const nextTopic = computed(() => slideMeta[currentSlideNo.value]?.topic ?? '—')
</script>

<template>
  <div class="nerv-chrome">
    <!-- 四隅 L 字 -->
    <div class="nerv-corner tl" />
    <div class="nerv-corner tr" />
    <div class="nerv-corner bl" />
    <div class="nerv-corner br" />

    <!-- 上部ステータスバー -->
    <div class="nerv-statusbar top">
      <span v-for="(it, i) in topStatus" :key="i" :class="toneClass(it.tone)">{{ it.text }}</span>
    </div>

    <!-- 左ガター: ドットレール -->
    <div class="nerv-gutter left">
      <div class="nerv-dot-rail" />
    </div>
    <!-- 右ガター -->
    <div class="nerv-gutter right">
      <div class="nerv-dot-rail" />
    </div>

    <!-- 下部 左: SYSTEM ブロック -->
    <div class="nerv-meta system">
      <span class="nerv-meta-label">[ SYSTEM ]</span>
      <div class="nerv-meta-rows">
        <div><span class="k">BUILD</span><span class="v">OK</span></div>
        <div><span class="k">REGION</span><span class="v">JP</span></div>
        <div><span class="k">LANG</span><span class="v">ja-JP</span></div>
      </div>
    </div>

    <!-- 下部 中央寄り: SESSION ブロック -->
    <div class="nerv-meta session">
      <span class="nerv-meta-label">[ SESSION ]</span>
      <div class="nerv-meta-rows">
        <div><span class="k">TOPIC</span><span class="v">{{ currentMeta.topic }}</span></div>
        <div><span class="k">STAGE</span><span class="v">{{ currentMeta.stage }}</span></div>
        <div><span class="k">NEXT</span><span class="v">{{ nextTopic }}</span></div>
      </div>
    </div>

    <!-- 下部 右寄り: PROGRESS バー -->
    <div class="nerv-progress">
      <div class="nerv-progress-head">
        <span class="nerv-meta-label">[ PROGRESS ]</span>
        <span class="nerv-progress-val">{{ progressPct }}%</span>
      </div>
      <div class="nerv-progress-track">
        <div class="nerv-progress-fill" :style="{ width: progressPct + '%' }" />
        <div
          v-for="i in (total - 1)"
          :key="`m-${i}`"
          class="nerv-progress-mark"
          :style="{ left: (i / total * 100) + '%' }"
        />
      </div>
    </div>

    <!-- 中央下: 十字マーク -->
    <div class="nerv-cross" />

    <!-- 下部右端: CHAPTER -->
    <div class="nerv-chapter">
      <div class="nerv-chapter-label">[ CHAPTER ]</div>
      <div class="nerv-chapter-no">{{ chapterNo }}</div>
      <div class="nerv-chapter-total">/ {{ totalNo }}</div>
    </div>
  </div>
</template>

<style scoped>
.nerv-chrome {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  font-family: var(--font-mono);
  color: var(--ink-soft);
}

/* 四隅 L 字 */
.nerv-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: var(--ink);
}
.nerv-corner.tl { top: 16px; left: 16px; border-left: 3px solid; border-top: 3px solid; }
.nerv-corner.tr { top: 16px; right: 16px; border-right: 3px solid; border-top: 3px solid; }
.nerv-corner.bl { bottom: 16px; left: 16px; border-left: 3px solid; border-bottom: 3px solid; }
.nerv-corner.br { bottom: 16px; right: 16px; border-right: 3px solid; border-bottom: 3px solid; }

/* 上部ステータスバー */
.nerv-statusbar {
  position: absolute;
  left: 60px;
  right: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.2em;
}
.nerv-statusbar.top { top: 22px; }

/* ガター・ドットレール */
.nerv-gutter {
  position: absolute;
  top: 50px;
  bottom: 50px;
  width: 3px;
  color: var(--ink);
}
.nerv-gutter.left { left: 16px; }
.nerv-gutter.right { right: 16px; }
.nerv-dot-rail {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      180deg,
      transparent 0,
      transparent calc(50% - 6px),
      rgba(26, 26, 26, 0.85) calc(50% - 6px),
      rgba(26, 26, 26, 0.85) calc(50% + 6px),
      transparent calc(50% + 6px)
    ),
    radial-gradient(circle at center, rgba(26, 26, 26, 0.95) 1.5px, transparent 1.8px);
  background-size: 100% 60px, 100% 12px;
  background-position: center, center;
  background-repeat: repeat-y, repeat-y;
}

/* 下部メタブロック */
.nerv-meta {
  position: absolute;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: 0.15em;
  font-weight: 700;
}
.nerv-meta.system { left: 60px; width: 220px; }
.nerv-meta.session { left: 320px; width: 240px; }

.nerv-meta-label {
  flex-shrink: 0;
  font-size: 9px;
  letter-spacing: 0.3em;
  font-weight: 700;
  color: rgba(26, 26, 26, 0.55);
}
.nerv-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}
.nerv-meta-rows > div {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 8px;
  align-items: baseline;
  border-bottom: 1px dotted rgba(26, 26, 26, 0.25);
  padding-bottom: 1px;
}
.nerv-meta-rows > div:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.nerv-meta-rows .k { color: rgba(26, 26, 26, 0.55); }
.nerv-meta-rows .v {
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.1em;
}

/* PROGRESS バー */
.nerv-progress {
  position: absolute;
  bottom: 24px;
  right: 320px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font-mono);
}
.nerv-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.nerv-progress-val {
  color: var(--ink);
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 0.1em;
}
.nerv-progress-track {
  position: relative;
  height: 14px;
  border: 1px solid var(--ink);
  transform: skewX(-30deg);
}
.nerv-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(26, 26, 26, 0.55);
}
.nerv-progress-mark {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px dotted var(--ink);
  transform: translateX(-50%);
}

/* 中央下の十字マーク */
.nerv-cross {
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background:
    linear-gradient(var(--ink) 0 0) no-repeat center / 100% 1px,
    linear-gradient(var(--ink) 0 0) no-repeat center / 1px 100%;
}

/* CHAPTER カウンタ */
.nerv-chapter {
  position: absolute;
  bottom: 18px;
  right: 60px;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--ink);
  background: var(--paper);
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.nerv-chapter-label {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--ink);
}
.nerv-chapter-no {
  font-weight: 900;
  font-size: 1.6rem;
  line-height: 1;
  letter-spacing: 0.05em;
  color: var(--ink);
}
.nerv-chapter-total {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--ink);
}
</style>
