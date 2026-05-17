<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  speaker: string
}>()

// 装飾文字列はこのコンポーネントの責務
const meta: string[] = ['GITHUB × TERRAFORM', 'LT-005', 'DURATION 00:05:00']
</script>

<template>
  <HudPanel label="[ MAIN / SUBJECT ]" panel-class="col-span-9 row-span-4 p-4">
    <div class="meta-row">
      <span class="hud-green">▶</span>
      <template v-for="(m, i) in meta" :key="i">
        <span class="opacity-50" v-if="i > 0">//</span>
        <span>{{ m }}</span>
      </template>
    </div>
    <div class="title-main" v-html="title" />
    <div class="title-footer">
      <span v-html="subtitle" />
      <span>SPEAKER: {{ speaker }}</span>
    </div>
  </HudPanel>
</template>

<style scoped>
.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 10px;
  opacity: 0.7;
  letter-spacing: 0.05em;
}
.title-main {
  font-weight: 900;
  font-size: 4.5rem;
  line-height: 1.35;
}
.title-footer {
  position: absolute;
  bottom: 0.75rem;
  left: 1rem;
  right: 1rem;
  border-top: 1px solid #1a1a1a;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
