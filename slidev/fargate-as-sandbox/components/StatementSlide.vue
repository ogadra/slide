<script setup lang="ts">
defineProps<{
  caseNo: string
  caseName: string
  kind?: string
}>()
</script>

<template>
  <div class="case-canvas statement">
    <div class="statement-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong> ·  {{ kind || 'INCIDENT' }}  ·  {{ caseName }}
      </div>
    </div>

    <div class="statement-tag">§ {{ caseNo }} · {{ kind || 'INCIDENT' }}</div>
    <div class="statement-rule" />

    <div class="statement-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.statement {
  gap: 0.8rem;
}

.statement-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.statement-tag {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.28em;
  color: var(--ink);
  text-transform: uppercase;
  margin-top: 0.6rem;
}
.statement-rule {
  height: 2px;
  background: var(--ink);
}

.statement-body {
  font-family: var(--font-sans);
  font-size: 2.5rem;
  line-height: 1.4;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.005em;
  line-break: strict;
  padding-top: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.statement-body :deep(p) {
  margin: 0 0 0.9rem 0;
  font-size: 2.5rem !important;
  line-height: 1.4 !important;
  font-family: inherit;
  font-weight: inherit;
}
.statement-body :deep(p:last-child) { margin-bottom: 0; }
.statement-body :deep(strong) {
  font-weight: 900;
  background: linear-gradient(transparent 60%, var(--accent-tint) 60%);
}
.statement-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--paper);
  border: 1.5px solid var(--ink);
  padding: 0 0.35em;
  white-space: nowrap;
  font-weight: 700;
}
.statement-body :deep(.arrow) {
  color: var(--accent);
  font-weight: 900;
  font-family: var(--font-mono);
  margin-right: 0.2em;
}
</style>
