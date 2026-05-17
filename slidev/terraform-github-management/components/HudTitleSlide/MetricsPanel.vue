<script setup lang="ts">
const metrics = [
  { label: 'REPOS', value: '055', percent: 55 },
  { label: 'BRANCHES', value: '007', percent: 100, tone: 'green' as const },
  { label: 'IAC COV', value: '13%', percent: 13, tone: 'orange' as const },
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
