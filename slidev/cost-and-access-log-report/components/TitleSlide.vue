<script setup lang="ts">
defineProps<{
  lines: string[]
  accent: string
  speaker: string
  event: string
}>()
</script>

<template>
  <div class="title-slide">
    <div class="title-slide__main">
      <h1 class="title-slide__heading">
        <template v-for="(line, i) in lines" :key="i">{{ line }}<br /></template><span class="title-slide__accent">{{ accent }}</span>
      </h1>
    </div>
    <p class="title-slide__meta">{{ speaker }}　—　{{ event }}</p>
  </div>
</template>

<style scoped>
.title-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  display: flex;
  flex-direction: column;
  padding: 130px;
  box-sizing: border-box;
}

.title-slide__main {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
}

.title-slide__heading {
  font-weight: 700;
  font-size: 132px;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.title-slide__accent {
  display: block;
  color: var(--clay);
}

.title-slide__meta {
  flex: none;
  margin-top: 72px;
  font-size: 30px;
  font-weight: 500;
  color: var(--ink-soft);
}
</style>
