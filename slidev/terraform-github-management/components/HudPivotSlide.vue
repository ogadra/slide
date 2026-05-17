<script setup lang="ts">
defineProps<{
  question: string
  answer: string
  bullets: string[]
}>()

// 装飾文字列
const knownTargets: { name: string; status: string }[] = [
  { name: 'AWS', status: 'KNOWN' },
  { name: 'Google Cloud', status: 'KNOWN' },
  { name: 'Azure', status: 'KNOWN' },
  { name: 'Datadog', status: 'KNOWN' },
]
const newTarget = { name: 'GitHub', status: 'ALSO MANAGED' }
</script>

<template>
  <HudSlide>
    <div class="pivot-grid">
      <HudPanel label="[ DEFINITION / TERRAFORM ]" panel-class="col-span-5 row-span-3 p-3 flex flex-col justify-center">
        <div class="def-row">
          <span class="def-title">TERRAFORM</span>
          <span class="def-sub">IaC ツール</span>
        </div>
        <ul class="def-list">
          <li v-for="(b, i) in bullets" :key="i"><span class="hud-green">▸</span> <span v-html="b" /></li>
        </ul>
      </HudPanel>

      <HudPanel label="[ KNOWN TARGETS ]" panel-class="col-span-7 row-span-3 p-3 flex flex-col justify-center">
        <div class="targets">
          <div v-for="(t, i) in knownTargets" :key="i" class="target-row">
            <span><span class="hud-green">●</span> {{ t.name }}</span>
            <span class="opacity-60">{{ t.status }}</span>
          </div>
          <div class="target-row new">
            <span><span class="hud-orange">●</span> {{ newTarget.name }}</span>
            <span class="hud-orange">{{ newTarget.status }}</span>
          </div>
        </div>
      </HudPanel>

      <HudPanel label="[ QUESTION ]" panel-class="col-span-5 row-span-3 p-4 flex flex-col justify-center">
        <div class="q-label">Q.</div>
        <div class="q-text" v-html="question" />
      </HudPanel>

      <HudPanel label="[ ANSWER ]" panel-class="col-span-7 row-span-3 p-4 flex flex-col justify-center">
        <div class="a-label">A.</div>
        <div class="a-text" v-html="answer" />
        <div class="a-foot">→ <span class="hud-green">数行で「Org」「Repo」「ブランチ保護」まで全部</span></div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.pivot-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 0.5rem;
  height: 100%;
}
.pivot-grid :deep(.hud-panel) {
  min-height: 0;
}
.def-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.2rem;
}
.def-title {
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
}
.def-sub {
  font-size: 10px;
  letter-spacing: 0.3em;
  opacity: 0.6;
}
.def-list {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.def-list li {
  font-size: 0.85rem !important;
  line-height: 1.75 !important;
  font-weight: 500 !important;
  margin-bottom: 0.15rem !important;
}
.def-list :deep(.mono) {
  font-family: var(--font-mono);
  border: 1px solid rgba(26, 26, 26, 0.4);
  padding: 0 0.3em;
  font-size: 0.85rem;
}
.def-list code {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  border: 1px solid rgba(26, 26, 26, 0.3);
  padding: 0 0.25rem;
}

.targets {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1rem;
}
.target-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(26, 26, 26, 0.3);
  padding-bottom: 0.1rem;
}
.target-row.new {
  font-weight: 700;
}

.q-label, .a-label {
  font-weight: 900;
  font-size: 1.5rem;
  opacity: 0.6;
  letter-spacing: 0.05em;
}
.q-text {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-top: 0.4rem;
}
.a-text {
  font-weight: 900;
  font-size: 1.65rem;
  line-height: 1.35;
  margin-top: 0.4rem;
}
.a-foot {
  border-top: 1px solid #1a1a1a;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
}
</style>
