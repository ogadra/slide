<script setup lang="ts">
defineProps<{
  caseNo: string
  caseName: string
  headline: string
}>()
</script>

<template>
  <div class="case-canvas resolution">
    <div class="resolution-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong> ·  RESOLUTION  ·  {{ caseName }}
      </div>
      <div class="case-stamp">SHIPPED</div>
    </div>

    <div class="resolution-main">
      <div class="resolution-leadcol">
        <div class="resolution-sectionno">§ {{ caseNo }}</div>
        <div class="resolution-sectiontag">RESOLUTION</div>
      </div>

      <div class="resolution-content">
        <div class="resolution-headline" v-html="headline" />
        <div class="resolution-rule" />
        <div class="resolution-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resolution {
  gap: 1.5rem;
}

.resolution-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.resolution-main {
  flex: 1;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 3rem;
  align-items: center;
}

.resolution-leadcol {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 1rem;
}
.resolution-sectionno {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 6rem;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--accent);
}
.resolution-sectiontag {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  color: var(--ink);
}

.resolution-content {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding-top: 0.5rem;
}

.resolution-headline {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 3rem;
  line-height: 1.3;
  color: var(--ink);
  letter-spacing: -0.015em;
}
.resolution-headline :deep(strong) {
  background: linear-gradient(transparent 55%, var(--accent-tint) 55%);
  padding: 0 0.1em;
}
.resolution-headline :deep(.accent) {
  color: var(--accent);
}

.resolution-rule {
  height: 2px;
  background: var(--ink);
  width: 60%;
}

.resolution-body {
  font-family: var(--font-sans);
  font-size: 1.3rem;
  line-height: 1.7;
  color: var(--ink);
}
.resolution-body :deep(p) {
  margin: 0 0 0.85rem 0;
  font-size: 2rem !important;
  line-height: 1.2 !important;
  font-family: inherit;
  font-weight: inherit;
}
.resolution-body :deep(p:last-child) { margin-bottom: 0; }
.resolution-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.95em;
  background: var(--paper);
  border: 1px solid var(--ink);
  padding: 0 0.35em;
  white-space: nowrap;
}
.resolution-body :deep(strong) {
  font-weight: 900;
  background: linear-gradient(transparent 60%, var(--accent-tint) 60%);
}
</style>
