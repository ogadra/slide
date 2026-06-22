<script setup lang="ts">
defineProps<{
  label?: string
  title: string
}>()
</script>

<template>
  <div class="tf-canvas section-slide">
    <div class="section-head">
      <span class="section-label">{{ label || '##' }}</span>
      <div class="tf-rule purple" />
    </div>

    <div class="section-main">
      <div class="section-title">{{ title }}</div>
    </div>
  </div>
</template>

<style scoped>
.section-slide {
  gap: 1.4rem;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.section-label {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: 0.18em;
  color: var(--tf-purple);
}
.section-head .tf-rule { flex: 1; height: 3px; }

.section-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 4.8rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-align: center;
  line-break: strict;
  white-space: nowrap;
}
</style>
