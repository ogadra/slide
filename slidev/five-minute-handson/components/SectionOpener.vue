<script setup lang="ts">
defineProps<{
  no?: string
}>()
</script>

<template>
  <div class="section-opener">
    <div v-if="no" class="section-opener__bignum">{{ no }}</div>
    <h2 class="section-opener__title">
      <slot />
    </h2>
  </div>
</template>

<style scoped>
.section-opener {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 160px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 縁取りだけの数字。塗らないので、文字の後ろにいても邪魔をしない */
.section-opener__bignum {
  position: absolute;
  right: 120px;
  bottom: 20px;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 460px;
  line-height: 0.78;
  color: transparent;
  -webkit-text-stroke: 2px rgba(86, 225, 245, 0.22);
}

.section-opener__title {
  position: relative;
  font-weight: 900;
  font-size: 148px;
  line-height: 1.24;
  letter-spacing: -0.035em;
}

.section-opener :deep(.accent) {
  color: var(--cyan);
}
</style>
