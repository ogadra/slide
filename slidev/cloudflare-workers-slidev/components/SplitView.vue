<script setup lang="ts">
import SandboxPreview from './SandboxPreview.vue';

defineProps<{
  leftWidth: string;
}>();
</script>

<template>
  <div class="split-view">
    <div class="left-panel" :style="{ width: leftWidth }">
      <slot />
    </div>
    <div class="right-panel" :style="{ width: `calc(100% - ${leftWidth})` }">
      <SandboxPreview />
    </div>
  </div>
</template>

<style scoped>
.split-view {
  display: flex;
  width: 100%;
  height: 350px;
  gap: 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.right-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>
