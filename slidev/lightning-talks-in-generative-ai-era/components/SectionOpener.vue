<script setup lang="ts">
defineProps<{
  no: string
  title: string
}>()
</script>

<template>
  <div class="section-opener">
    <div class="section-opener__bignum">{{ no }}</div>
    <div class="section-opener__no">{{ no }}</div>
    <h2 class="section-opener__title">{{ title }}</h2>
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
  right: 100px;
  bottom: -160px;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 720px;
  line-height: 0.8;
  color: var(--base);
  opacity: 0.05;
}

.section-opener__no {
  position: relative;
  z-index: 2;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 32px;
  color: var(--amber);
  margin-bottom: 28px;
}

.section-opener__title {
  position: relative;
  z-index: 2;
  font-weight: 700;
  font-size: 140px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
</style>
