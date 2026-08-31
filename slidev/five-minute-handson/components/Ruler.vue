<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

// 5分のうちどこにいるかを一本の線で見せる
const { currentPage, total } = useNav()

const progress = computed(() => {
  if (total.value <= 1) return 100
  return ((currentPage.value - 1) / (total.value - 1)) * 100
})
</script>

<template>
  <div class="ruler">
    <i class="ruler__fill" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped>
.ruler {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  z-index: 10;
  background: rgba(86, 225, 245, 0.10);
  pointer-events: none;
}

.ruler__fill {
  display: block;
  height: 100%;
  background: var(--cyan);
  box-shadow: 0 0 18px rgba(86, 225, 245, 0.6);
}
</style>
