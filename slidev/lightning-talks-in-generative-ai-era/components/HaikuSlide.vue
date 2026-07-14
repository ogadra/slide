<script setup lang="ts">
defineProps<{
  lines: [string, string, string]
}>()
</script>

<template>
  <div class="haiku-slide">
    <div class="haiku-slide__poem">
      <span class="haiku-slide__line haiku-slide__line--indent">{{ lines[0] }}</span>
      <span class="haiku-slide__line haiku-slide__line--indent">{{ lines[1] }}</span>
      <span class="haiku-slide__line">{{ lines[2] }}</span>
    </div>
    <div class="haiku-slide__mark">
      <Mascot :size="440" />
    </div>
  </div>
</template>

<style scoped>
.haiku-slide {
  position: absolute;
  inset: 0;
  background: var(--tan);
  color: var(--tan-deep);
  overflow: hidden;
}

.haiku-slide__poem {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  writing-mode: vertical-rl;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 124px;
  line-height: 1.5;
  color: #FFFFFF;
  -webkit-text-stroke: 6px var(--tan-deep);
  paint-order: stroke;
}

.haiku-slide__line {
  display: block;
  white-space: nowrap;
}

.haiku-slide__line--indent {
  margin-left: 24px;
}

.haiku-slide__mark {
  position: absolute;
  left: 80px;
  bottom: 0;
}
</style>
