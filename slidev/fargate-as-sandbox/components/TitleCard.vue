<script setup lang="ts">
defineProps<{
  titleEn: string
  titleJa: string
  subtitle: string
  speaker: string
}>()
</script>

<template>
  <div class="case-canvas title-card">
    <div class="title-top">
      <div class="title-meta">
        <div class="case-meta">
          <strong>CASE FILE</strong> :: PRESENTATION DECK
        </div>
        <div class="case-meta soft">
          FILED 2026-06-22 / RUNTIME 00:05:00
        </div>
      </div>
      <div class="title-stamp">
        <span class="case-stamp slate">UNCLASSIFIED · LT TALK</span>
      </div>
    </div>

    <div class="title-main">
      <div class="title-display">
        <span class="title-line">FARGATE</span>
        <span class="title-line">:: SANDBOX</span>
      </div>
      <div class="title-display sub">{{ titleJa }}</div>
    </div>

    <div class="title-foot">
      <div class="case-rule thick" />
      <div class="title-foot-row">
        <div class="title-foot-col">
          <div class="case-meta">SPEAKER</div>
          <div class="title-foot-val">{{ speaker }}</div>
        </div>
        <div class="title-foot-col">
          <div class="case-meta">VENUE</div>
          <div class="title-foot-val">{{ subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-card {
  justify-content: space-between;
}

.title-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.title-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title-meta .soft { opacity: 0.6; }

.title-stamp {
  padding-top: 4px;
}

.title-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 0.25rem;
}

.title-display {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 8rem;
  line-height: 0.86;
  letter-spacing: -0.04em;
  color: var(--ink);
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
}
.title-line { display: block; }

.title-display.sub {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 3.4rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-transform: none;
  margin-top: 1.4rem;
  white-space: nowrap;
}

.title-foot {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 4px;
}
.title-foot-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
.title-foot-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.title-foot-val {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.25rem;
  color: var(--ink);
}
</style>
