<script setup lang="ts">
defineProps<{
  lines: string[]
  speaker: string
}>()
</script>

<template>
  <div class="title-slide">
    <div class="title-slide__glow" />
    <div class="title-slide__main">
      <h1 class="title-slide__heading">
        <template v-for="(line, i) in lines" :key="i">{{ line }}<br /></template>
      </h1>
      <p class="title-slide__meta">{{ speaker }}</p>
    </div>
  </div>
</template>

<style scoped>
.title-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 160px;
  box-sizing: border-box;
  overflow: hidden;
}

.title-slide__glow {
  position: absolute;
  left: -380px;
  top: -320px;
  width: 1500px;
  height: 1500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(63, 123, 224, 0.20), transparent 62%);
  pointer-events: none;
}

.title-slide__main {
  position: relative;
}

.title-slide__heading {
  font-weight: 900;
  font-size: 180px;
  line-height: 1.24;
  letter-spacing: -0.035em;
}

.title-slide__meta {
  margin-top: 72px;
  font-family: var(--font-mono);
  font-size: 60px;
  letter-spacing: 0.16em;
  color: var(--mute);
}
</style>
