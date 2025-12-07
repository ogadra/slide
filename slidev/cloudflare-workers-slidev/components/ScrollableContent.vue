<script setup lang="ts">
const props = defineProps({
  maxHeight: {
    type: String,
    default: '380px',
  },
});
</script>

<template>
  <div class="scrollable-content" :style="{ maxHeight: props.maxHeight }">
    <slot />
  </div>
</template>

<style scoped>
.scrollable-content {
  overflow-y: auto;
}
</style>
