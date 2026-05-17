<script setup lang="ts">
import { type HudTone, hudToneClass } from '../../utils/hudTone'

const resources: { name: string; status: string; tone: HudTone }[] = [
  { name: 'github_repository', status: 'READY', tone: 'green' },
  { name: 'github_branch_protection', status: 'READY', tone: 'green' },
  { name: 'github_team', status: 'READY', tone: 'green' },
  { name: 'github_repository_collaborator', status: 'DRIFT', tone: 'red' },
  { name: 'github_actions_secret', status: 'READY', tone: 'green' },
  { name: 'github_membership', status: 'SYNC', tone: 'orange' },
]

const valueClass = (tone: HudTone) => (tone === 'green' ? '' : hudToneClass(tone))
</script>

<template>
  <HudPanel label="[ RESOURCES ]" panel-class="col-span-12 row-span-2 p-3">
    <div class="resources-grid">
      <div v-for="(r, i) in resources" :key="i" class="resource-row">
        <span><span :class="hudToneClass(r.tone)">●</span> {{ r.name }}</span>
        <span :class="valueClass(r.tone)" :style="r.tone === 'green' ? 'opacity: 0.6' : ''">{{ r.status }}</span>
      </div>
    </div>
  </HudPanel>
</template>

<style scoped>
.resources-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  row-gap: 0.25rem;
  font-size: 10px;
  margin-top: 0.75rem;
}
.resource-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(26, 26, 26, 0.3);
  padding-bottom: 0.125rem;
}
</style>
