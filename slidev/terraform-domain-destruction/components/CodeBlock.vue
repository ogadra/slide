<script setup lang="ts">
defineProps<{
  caption?: string
  label?: string
}>()
</script>

<template>
  <div class="tf-canvas code-slide">
    <div class="code-head" v-if="label || caption">
      <span v-if="label" class="code-label">{{ label }}</span>
      <span v-if="caption" class="code-caption">{{ caption }}</span>
    </div>
    <div class="code-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-slide {
  gap: 0.8rem;
  justify-content: flex-start;
  padding-top: 0.8rem;
}

.code-head {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
}
.code-label {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.24em;
  color: var(--tf-purple);
  text-transform: uppercase;
}
.code-caption {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink);
}

.code-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
}
.code-body :deep(pre),
.code-body :deep(.slidev-code-wrapper),
.code-body :deep(.shiki) {
  width: 100%;
  max-height: 100%;
  overflow: auto;
  font-size: 0.78rem !important;
  line-height: 1.35 !important;
  padding: 0.8rem 1rem !important;
}
</style>
