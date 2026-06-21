<script setup lang="ts">
defineProps<{
  cases: { no: string; title: string; tag: string }[]
}>()
</script>

<template>
  <div class="case-canvas summary">
    <div class="summary-top">
      <div class="case-meta">
        <strong>CASE FILE</strong> ·  SUMMARY  ·  3 INCIDENTS · 3 RESOLUTIONS
      </div>
      <div class="case-stamp">ALL SHIPPED</div>
    </div>

    <div class="summary-head">
      <div class="summary-headline">主な特徴</div>
      <div class="summary-sub">FARGATE :: SANDBOX — 3つの“ぶっとんだ”決断</div>
    </div>
    <div class="summary-rule" />

    <div class="summary-cases">
      <div v-for="c in cases" :key="c.no" class="summary-case">
        <div class="summary-case-no">{{ c.no }}</div>
        <div class="summary-case-tag">{{ c.tag }}</div>
        <div class="summary-case-title">{{ c.title }}</div>
        <div class="summary-case-rule" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary {
  gap: 1.2rem;
}

.summary-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 2px;
}

.summary-head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
}
.summary-headline {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 3.2rem;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.summary-sub {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.summary-rule {
  height: 3px;
  background: var(--ink);
  margin-top: 0.6rem;
}

.summary-cases {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;
  align-content: start;
}

.summary-case {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.summary-case-no {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 9.5rem;
  line-height: 0.82;
  letter-spacing: -0.04em;
  color: var(--accent);
}
.summary-case-tag {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.28em;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.summary-case-title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.35rem;
  line-height: 1.45;
  color: var(--ink);
  letter-spacing: -0.015em;
  line-break: strict;
}
.summary-case-rule {
  height: 1px;
  background: var(--ink);
  margin-top: auto;
}
</style>
