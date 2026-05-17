<script setup lang="ts">
defineProps<{
  position: 'top' | 'bottom'
  items: { text: string; tone?: 'default' | 'green' | 'red' | 'orange' }[]
}>()

const toneClass = (tone?: string) => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}
</script>

<template>
  <div class="hud-statusbar" :style="position === 'top' ? { top: '20px' } : { bottom: '20px' }">
    <span v-for="(item, i) in items" :key="i" :class="toneClass(item.tone)">{{ item.text }}</span>
  </div>
</template>
