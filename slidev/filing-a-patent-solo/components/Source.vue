<script setup lang="ts">
defineProps<{
  label: string
  url: string
}>()
</script>

<template>
  <div class="source">
    <span class="source__label">出典 : {{ label }}</span>
    <span class="source__url">{{ url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</span>
  </div>
</template>

<style scoped>
.source {
  position: absolute;
  right: 100px;
  bottom: 52px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  text-align: right;
  color: var(--mute);
}

.source__label {
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0.01em;
}

.source__url {
  font-family: var(--font-mono);
  font-size: 26px;
  line-height: 1;
  letter-spacing: 0.02em;
  opacity: 0.72;
}
</style>
