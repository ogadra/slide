<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="code-slide">
    <h2 class="code-slide__title">{{ title }}</h2>
    <div class="code-slide__block">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.code-slide__title {
  font-weight: 700;
  font-size: 88px;
  margin-bottom: 60px;
  letter-spacing: -0.02em;
}

.code-slide__block {
  background: var(--ink);
  padding: 64px 72px;
  font-family: var(--font-mono);
  font-size: 40px;
  line-height: 1.9;
  color: var(--base);
}

.code-slide__block :deep(.kw) { color: var(--amber); }
.code-slide__block :deep(.str) { color: var(--cherry); }
.code-slide__block :deep(.cm) { color: #9C9484; }
</style>
