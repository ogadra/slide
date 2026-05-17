<script setup lang="ts">
import MainPanel from './HudTitleSlide/MainPanel.vue'
import TargetPanel from './HudTitleSlide/TargetPanel.vue'
import MetricsPanel from './HudTitleSlide/MetricsPanel.vue'
import ResourcesPanel from './HudTitleSlide/ResourcesPanel.vue'

defineProps<{
  title: string
  subtitle: string
  speaker: string
}>()
</script>

<template>
  <HudSlide>
    <div class="title-grid">
      <MainPanel :title="title" :subtitle="subtitle" :speaker="speaker" />
      <TargetPanel />
      <MetricsPanel />
      <ResourcesPanel />
    </div>
  </HudSlide>
</template>

<style scoped>
.title-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.5rem;
  height: 100%;
}
</style>
