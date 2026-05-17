<script setup lang="ts">
import { computed } from 'vue'
import { type HudTone, hudToneClass } from '../utils/hudTone'

type ResourceKey = 'github_repository' | 'for_each'

const props = defineProps<{
  resource: ResourceKey
  fileNote?: string
}>()

// 装飾的なFAKEコマンド出力。resourceに応じてコンポーネント側で持つ。
type Cmd = { cmd: string; result: string; tone?: HudTone }
const commandsByResource: Record<ResourceKey, Cmd[]> = {
  github_repository: [
    { cmd: '$ terraform fmt', result: 'OK', tone: 'green' },
    { cmd: '$ terraform validate', result: 'OK', tone: 'green' },
    { cmd: '$ terraform plan', result: '+1 to add', tone: 'orange' },
    { cmd: '$ terraform apply', result: 'applied', tone: 'green' },
  ],
  for_each: [
    { cmd: '$ terraform plan', result: '+3 to add', tone: 'orange' },
    { cmd: '$ terraform apply', result: '3 applied', tone: 'green' },
  ],
}
const commands = computed<Cmd[]>(() => commandsByResource[props.resource])
</script>

<template>
  <HudSlide>
    <div class="grid">
      <HudPanel :label="`[ RESOURCE / ${resource} ]`" panel-class="col-span-8 row-span-6 p-2">
        <div class="title-row">
          <div class="title">RESOURCE</div>
          <div class="title-note">{{ fileNote }}</div>
        </div>
        <div class="code-wrap">
          <slot name="code" />
        </div>
      </HudPanel>

      <HudPanel label="[ COMMANDS ]" panel-class="col-span-4 row-span-3 p-3">
        <div class="cmd-list">
          <div v-for="(c, i) in commands" :key="i" class="cmd-row">
            <span class="font-mono">{{ c.cmd }}</span>
            <span :class="hudToneClass(c.tone)">{{ c.result }}</span>
          </div>
        </div>
      </HudPanel>

      <HudPanel label="[ NOTE ]" panel-class="col-span-4 row-span-3 p-2">
        <div class="note">
          <slot name="note" />
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.75rem;
  height: 100%;
}

.title-row {
  display: flex;
  align-items: baseline;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}
.title {
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: 0.02em;
  margin-right: 0.75rem;
}
.title-note {
  font-size: 10px;
  letter-spacing: 0.15em;
  opacity: 0.6;
}

.code-wrap :deep(pre),
.code-wrap :deep(.shiki) {
  font-size: 1.5rem !important;
  line-height: 1.3 !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.cmd-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
}
.cmd-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(26, 26, 26, 0.3);
  padding-bottom: 0.25rem;
}

.note {
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.note > * {
  line-height: 1.5 !important;
}
</style>
