<script setup lang="ts">
defineProps<{
  no: string
  headline: string
}>()
</script>

<template>
  <div class="tf-canvas lesson">
    <div class="lesson-head">
      <span class="lesson-label">どうすれば良かったのか</span>
      <div class="tf-rule purple" />
    </div>

    <div class="lesson-main">
      <div class="lesson-no">{{ no }}</div>
      <div class="lesson-rule" />
      <div class="lesson-content">
        <div class="lesson-headline" v-html="headline" />
        <div class="lesson-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lesson {
  gap: 1.4rem;
}

.lesson-head {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.lesson-label {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.24em;
  color: var(--tf-purple);
  white-space: nowrap;
}
.lesson-head .tf-rule { flex: 1; height: 2px; }

.lesson-main {
  flex: 1;
  display: grid;
  grid-template-columns: 11rem 3px 1fr;
  gap: 2rem;
  align-items: center;
  min-width: 0;
}

.lesson-no {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 11rem;
  line-height: 0.82;
  letter-spacing: -0.04em;
  color: var(--tf-purple);
}
.lesson-rule {
  width: 3px;
  height: 70%;
  background: var(--ink);
}

.lesson-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 0;
}
.lesson-headline {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 2.2rem;
  line-height: 1.45;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-break: strict;
  overflow-wrap: break-word;
}
.lesson-headline :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.66em;
  background: var(--paper);
  border: 1.5px solid var(--ink);
  padding: 0.15em 0.35em;
  font-weight: 700;
  word-break: normal;
  overflow-wrap: break-word;
  line-height: 1.5;
  display: inline-block;
  max-width: 100%;
}
.lesson-headline :deep(strong) {
  background: linear-gradient(transparent 58%, var(--tf-purple-tint) 58%);
  padding: 0 0.1em;
}

.lesson-body {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 4rem;
  line-height: 1.45;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-break: strict;
  overflow-wrap: break-word;

}
.lesson-body :deep(p) {
  margin: 0 0 0.6rem 0;
  font-size: inherit !important;
  line-height: inherit !important;
  font-family: inherit;
}
.lesson-body :deep(p:last-child) { margin-bottom: 0; }
.lesson-body :deep(code) {
  font-family: var(--font-mono);
  background: var(--paper);
  border: 1px solid var(--ink-soft);
  padding: 0 0.3em;
}

.lesson-body :deep(strong) {
  background: linear-gradient(transparent 58%, var(--tf-purple-tint) 58%);
  padding: 0 0.1em;
}
</style>
