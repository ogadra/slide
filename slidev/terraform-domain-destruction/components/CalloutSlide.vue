<script setup lang="ts">
defineProps<{
  tone?: 'accent' | 'threat'
  label?: string
}>()
</script>

<template>
  <div class="tf-canvas callout">
    <div class="callout-head">
      <span class="callout-label" :class="tone || 'accent'">
        {{ label || (tone === 'threat' ? '!! WARNING' : '!! NOTICE') }}
      </span>
      <div class="tf-rule" :class="tone === 'threat' ? 'red' : 'purple'" />
    </div>

    <div class="callout-main">
      <div class="callout-mark" :class="tone || 'accent'">!</div>
      <div class="callout-text"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.callout {
  gap: 1.1rem;
}

.callout-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.callout-label {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.24em;
  white-space: nowrap;
}
.callout-label.accent { color: var(--tf-purple); }
.callout-label.threat { color: var(--tf-red); }

.callout-head .tf-rule { flex: 1; height: 3px; }

.callout-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2.2rem;
  padding: 1.2rem 0;
  min-width: 0;
}

.callout-mark {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 12rem;
  line-height: 0.82;
  flex-shrink: 0;
}
.callout-mark.accent { color: var(--tf-purple); }
.callout-mark.threat { color: var(--tf-red); }

.callout-text {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 2rem;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-break: strict;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
}
.callout-text :deep(p) {
  margin: 0 0 0.6rem 0;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: inherit;
  font-family: inherit;
}
.callout-text :deep(p:last-child) { margin-bottom: 0; }
.callout-text :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--paper);
  border: 2px solid var(--ink);
  padding: 0.15em 0.35em;
  font-weight: 900;
  word-break: normal;
  overflow-wrap: break-word;
  line-height: 1.5;
  display: inline-block;
  max-width: 100%;
}
.callout-text :deep(strong) {
  font-weight: 900;
  background: linear-gradient(transparent 60%, var(--tf-red-tint) 60%);
}
</style>
