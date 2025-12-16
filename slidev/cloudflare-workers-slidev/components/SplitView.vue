<script setup lang="ts">
import SandboxPreview from './SandboxPreview.vue';

defineProps<{
  leftWidth: string;
}>();
</script>

<template>
  <div class="split-view">
    <div class="left-panel" :style="{ width: leftWidth, maxWidth: leftWidth }">
      <slot />
    </div>
    <div class="right-panel">
      <SandboxPreview />
    </div>
  </div>
</template>

<style scoped>
.split-view {
  display: flex;
  width: 840px;
  height: 350px;
  gap: 16px;
  box-sizing: border-box;
}

.left-panel {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;
}

.right-panel {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
