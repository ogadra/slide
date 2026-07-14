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
      <p class="title-slide__meta">{{ speaker }}　—　{{ event }}</p>
    </div>
    <div class="title-slide__mark">
      <Mascot :size="560" />
    </div>
  </div>
</template>

<style scoped>
.title-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  background: var(--base);
  color: var(--ink);
}

.title-slide__main {
  flex: 1;
  padding: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 30px;
  font-weight: 500;
  margin-top: 72px;
  color: var(--ink-soft);
}

.title-slide__mark {
  width: 660px;
  background: var(--tan);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
