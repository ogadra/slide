<script setup lang="ts">
import KLine from './KLine.vue'
import { useStage } from './stage'

const { live, take } = useStage()

const terminalLines = [
  { text: '$ git add --all 夜なべの成果', kind: 'cmd', delay: 0 },
  { text: '$ git diff --staged 昨日の自分', kind: 'cmd', delay: 0.4 },
  { text: '- あきらめかけた フロウ', kind: 'del', delay: 0.8 },
  { text: '+ 頑張り紡いだ フロウ', kind: 'add', delay: 1.2 },
  { text: '+ 韻を踏み直した フック', kind: 'add', delay: 1.6 },
  { text: '$ git commit -m "頑張り、紡いだ差分"', kind: 'cmd', delay: 2.1 },
  { text: '[main 5abun0c] ∞ insertions(+), 0 regrets(-)', kind: 'out', delay: 2.7 },
]

const graphNodes = [
  { label: 'リリック', delay: 0 },
  { label: 'ギミック', delay: 0.4 },
  { label: 'コミット', delay: 0.8 },
  { label: '???', delay: 1.2, ghost: true },
]
</script>

<template>
  <div v-if="live" :key="take" class="commit">
    <div class="commit__scanlines" />

    <p class="commit__tag">BAR 03 — SABUN</p>
    <p class="commit__hash">#5abun0c0mm17</p>

    <div class="commit__terminal">
      <div class="commit__terminal-bar">
        <span class="commit__terminal-dot" style="background: #FF5F57" />
        <span class="commit__terminal-dot" style="background: #FEBC2E" />
        <span class="commit__terminal-dot" style="background: #28C840" />
        <span class="commit__terminal-title">ogadra@stage: ~/verse</span>
      </div>
      <div class="commit__terminal-body">
        <p
          v-for="(line, i) in terminalLines"
          :key="i"
          class="commit__terminal-line"
          :class="`commit__terminal-line--${line.kind}`"
          :style="{ animationDelay: `${line.delay}s` }"
        >{{ line.text }}</p>
      </div>
    </div>

    <div class="commit__graph">
      <div class="commit__graph-line" />
      <div
        v-for="(node, i) in graphNodes"
        :key="i"
        class="commit__graph-node"
        :class="{ 'commit__graph-node--ghost': node.ghost }"
        :style="{ animationDelay: `${node.delay}s` }"
      >
        <span class="commit__graph-dot" />
        <span class="commit__graph-label">{{ node.label }}</span>
      </div>
    </div>

    <div class="commit__lyrics">
      <p class="commit__line-sub">
        <KLine text="頑張り紡ぐよ" mode="type" :delay="0" :stagger="0.11" />
      </p>
      <h1 class="commit__line-main">
        <KLine text="差分をコミット" accent="コミット" mode="type" :delay="1.5" :stagger="0.17" /><span class="commit__caret" />
      </h1>
    </div>
  </div>
</template>

<style scoped>
.commit {
  position: absolute;
  inset: 0;
  background: #07100A;
  overflow: hidden;
}

.commit__scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgba(61, 220, 132, 0.05) 0px,
    rgba(61, 220, 132, 0.05) 2px,
    transparent 2px,
    transparent 6px
  );
}

.commit__tag {
  position: absolute;
  top: 88px;
  left: 80px;
  font-family: var(--font-mono);
  font-size: 30px;
  letter-spacing: 0.3em;
  color: var(--lime);
  border: 2px solid var(--lime);
  padding: 12px 28px;
  animation: commit-slide 0.9s cubic-bezier(0.2, 1.4, 0.3, 1) both;
}

.commit__hash {
  position: absolute;
  top: 100px;
  right: 80px;
  font-family: var(--font-mono);
  font-size: 30px;
  color: rgba(61, 220, 132, 0.7);
  animation: commit-fade 0.6s ease-out both;
}

@keyframes commit-slide {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes commit-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.commit__terminal {
  position: absolute;
  right: 90px;
  top: 200px;
  width: 840px;
  border-radius: 18px;
  border: 2px solid rgba(61, 220, 132, 0.35);
  background: rgba(4, 10, 6, 0.9);
  overflow: hidden;
  animation: commit-terminal 1s cubic-bezier(0.2, 1.2, 0.3, 1) both;
}

@keyframes commit-terminal {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.commit__terminal-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  background: rgba(61, 220, 132, 0.1);
  border-bottom: 1px solid rgba(61, 220, 132, 0.25);
}

.commit__terminal-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.commit__terminal-title {
  margin-left: 14px;
  font-family: var(--font-mono);
  font-size: 22px;
  color: var(--paper-mute);
}

.commit__terminal-body {
  padding: 26px 30px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.commit__terminal-line {
  font-family: var(--font-mono);
  font-size: 26px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 0;
  animation: commit-type 0.9s steps(24) both;
}

@keyframes commit-type {
  from { max-width: 0; }
  to { max-width: 100%; }
}

.commit__terminal-line--cmd { color: var(--paper); }
.commit__terminal-line--add { color: var(--lime); }
.commit__terminal-line--del { color: var(--alarm); text-decoration: line-through; }
.commit__terminal-line--out { color: var(--paper-mute); }

.commit__graph {
  position: absolute;
  left: 100px;
  top: 210px;
  height: 330px;
}

.commit__graph-line {
  position: absolute;
  left: 13px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(61, 220, 132, 0.5);
  transform-origin: top;
  animation: commit-grow 1.6s cubic-bezier(0.3, 1, 0.4, 1) both;
}

@keyframes commit-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

.commit__graph-node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 22px;
  height: 82px;
  animation: commit-node 0.8s cubic-bezier(0.3, 1.6, 0.4, 1) both;
}

@keyframes commit-node {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.commit__graph-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--void);
  border: 5px solid var(--lime);
  box-shadow: 0 0 18px rgba(61, 220, 132, 0.6);
}

.commit__graph-label {
  font-family: var(--font-mono);
  font-size: 27px;
  color: rgba(245, 241, 230, 0.75);
}

.commit__graph-node--ghost .commit__graph-dot {
  border-style: dashed;
  border-color: rgba(61, 220, 132, 0.45);
  box-shadow: none;
}

.commit__graph-node--ghost .commit__graph-label {
  color: rgba(245, 241, 230, 0.35);
}

.commit__lyrics {
  position: absolute;
  left: 100px;
  bottom: 150px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.commit__line-sub {
  font-weight: 700;
  font-size: 78px;
  color: var(--paper);
}

.commit__line-main {
  font-family: var(--font-display);
  font-size: 176px;
  line-height: 1;
  color: var(--paper);
  --kline-accent: var(--lime);
  --kline-accent-shadow: 0 0 42px rgba(61, 220, 132, 0.7);
}

.commit__caret {
  display: inline-block;
  width: 0.14em;
  height: 0.9em;
  margin-left: 0.08em;
  background: var(--lime);
  vertical-align: baseline;
  animation: commit-caret 0.9s steps(1) infinite;
}

@keyframes commit-caret {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
</style>
