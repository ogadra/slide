<script setup lang="ts">
defineProps<{
  label: string
  panelClass?: string
}>()
</script>

<template>
  <div :class="['hud-panel', panelClass]">
    <div class="hud-panel-label">{{ label }}</div>
    <slot />
  </div>
</template>
