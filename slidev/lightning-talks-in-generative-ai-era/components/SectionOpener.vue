<script setup lang="ts">
defineProps<{
  no: string
}>()
</script>

<template>
  <div class="section-opener">
    <div class="section-opener__bignum">{{ no }}</div>
    <h2 class="section-opener__title">
      <slot />
    </h2>
  </div>
</template>

<style scoped>
.section-opener {
  position: absolute;
  inset: 0;
  background: var(--ink);
  color: var(--base);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 130px;
  box-sizing: border-box;
}

.section-opener__bignum {
  position: absolute;
  right: 80px;
  bottom: 60px;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 240px;
  line-height: 0.8;
  color: var(--base);
  opacity: 0.08;
}

.section-opener__title {
  position: relative;
  z-index: 2;
  font-weight: 700;
  font-size: 220px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.section-opener :deep(.accent) {
  color: var(--clay);
}
</style>
