<script setup lang="ts">
defineProps<{
  lines: string[]
  size?: number
}>()
</script>

<template>
  <div class="takahashi">
    <h1 class="takahashi__text" :style="{ fontSize: `${size ?? 140}px` }">
      <span v-for="(line, i) in lines" :key="i" class="takahashi__line">{{ line }}</span>
    </h1>
  </div>
</template>

<style scoped>
.takahashi {
  position: absolute;
  inset: 0;
  background: var(--void);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
}

.takahashi__text {
  font-family: var(--font-sans);
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  color: var(--paper);
}

.takahashi__line {
  display: block;
}
</style>
