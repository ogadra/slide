<script setup lang="ts">
defineProps<{
  caseNo: string
  caseName: string
  kind?: string
  tone?: 'accent' | 'threat'
}>()
</script>

<template>
  <div class="case-canvas callout">
    <div class="callout-top">
      <div class="case-meta">
        <strong>CASE :: {{ caseNo }}</strong> ·  {{ kind || 'INCIDENT' }}  ·  {{ caseName }}
      </div>
    </div>

    <div class="callout-tag" :class="tone || 'accent'">§ {{ caseNo }} · {{ kind || 'INCIDENT' }}</div>
    <div class="callout-rule" :class="tone || 'accent'" />

    <div class="callout-main">
      <div class="callout-mark" :class="tone || 'accent'">!</div>
      <div class="callout-text"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.callout {
  gap: 0.8rem;
}

.callout-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 8px;
}

.callout-tag {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin-top: 0.6rem;
}
.callout-tag.accent { color: var(--accent); }
.callout-tag.threat { color: var(--threat); }

.callout-rule {
  height: 3px;
}
.callout-rule.accent { background: var(--accent); }
.callout-rule.threat { background: var(--threat); }

.callout-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem 0;
}

.callout-mark {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 14rem;
  line-height: 0.82;
  flex-shrink: 0;
}
.callout-mark.accent { color: var(--accent); }
.callout-mark.threat { color: var(--threat); }

.callout-text {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 3.6rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-break: strict;
}
.callout-text :deep(p) {
  margin: 0;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: inherit;
  font-family: inherit;
}
.callout-text :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--paper);
  border: 2px solid var(--ink);
  padding: 0 0.3em;
  font-weight: 900;
}
</style>
