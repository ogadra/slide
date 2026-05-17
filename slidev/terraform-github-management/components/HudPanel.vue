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

<style scoped>
.hud-panel {
  border: 1px solid #1a1a1a;
  position: relative;
}
.hud-panel-label {
  position: absolute;
  top: 0;
  left: 12px;
  transform: translateY(-50%);
  background: #ffffff;
  padding: 0 6px;
  font-size: 9px;
  letter-spacing: 0.3em;
  font-family: var(--font-mono);
  font-weight: 700;
  color: #1a1a1a;
  z-index: 2;
}
</style>
