<script setup lang="ts">
// 装飾文字列なのでmd側からは渡さない
const metrics = [
  { label: 'REPOS', value: '014', percent: 70 },
  { label: 'BRANCHES', value: '062', percent: 85, tone: 'green' as const },
  { label: 'IAC COV', value: '87%', percent: 87, tone: 'green' as const },
]
</script>

<template>
  <HudPanel label="[ METRICS ]" panel-class="col-span-3 row-span-2 p-3">
    <div class="metrics-list">
      <HudMetric v-for="(m, i) in metrics" :key="i" v-bind="m" />
    </div>
  </HudPanel>
</template>

<style scoped>
.metrics-list {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
