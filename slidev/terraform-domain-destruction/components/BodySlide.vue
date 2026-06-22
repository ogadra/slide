<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="tf-canvas body-slide" :class="`size-${size || 'md'}`">
    <div class="body-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.body-slide {
  justify-content: center;
}

.body-content {
  font-family: var(--font-sans);
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.005em;
  line-height: 1.55;
  line-break: strict;
}
.body-slide.size-sm .body-content { font-size: 1.9rem; }
.body-slide.size-md .body-content { font-size: 2.4rem; }
.body-slide.size-lg .body-content { font-size: 3.2rem; }

.body-content :deep(p) {
  margin: 0 0 0.9rem 0;
  font-size: inherit !important;
  line-height: inherit !important;
  font-family: inherit;
  font-weight: inherit;
}
.body-content :deep(p:last-child) { margin-bottom: 0; }
.body-content :deep(strong) {
  font-weight: 900;
  background: linear-gradient(transparent 60%, var(--tf-purple-tint) 60%);
  padding: 0 0.1em;
}
.body-content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: var(--paper);
  border: 1.5px solid var(--ink);
  padding: 0 0.35em;
  white-space: nowrap;
  font-weight: 700;
}
</style>
