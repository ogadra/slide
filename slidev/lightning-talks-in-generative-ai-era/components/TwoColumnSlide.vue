<script setup lang="ts">
defineProps<{
  title: string
  headingA: string
  headingB: string
  itemsA: string[]
  itemsB: string[]
}>()
</script>

<template>
  <div class="two-column-slide">
    <h2 class="two-column-slide__title">{{ title }}</h2>
    <div class="two-column-slide__body">
      <div class="two-column-slide__col">
        <h3 class="two-column-slide__sub">{{ headingA }}</h3>
        <ul class="two-column-slide__list">
          <li v-for="(item, i) in itemsA" :key="i">{{ item }}</li>
        </ul>
      </div>
      <div class="two-column-slide__divider" />
      <div class="two-column-slide__col">
        <h3 class="two-column-slide__sub two-column-slide__sub--accent">{{ headingB }}</h3>
        <ul class="two-column-slide__list">
          <li v-for="(item, i) in itemsB" :key="i">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-column-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.two-column-slide__title {
  font-weight: 700;
  font-size: 88px;
  margin-bottom: 90px;
  letter-spacing: -0.02em;
}

.two-column-slide__body {
  display: flex;
  gap: 120px;
  flex: 1;
}

.two-column-slide__col {
  flex: 1;
}

.two-column-slide__sub {
  font-weight: 700;
  font-size: 52px;
  margin-bottom: 40px;
}

.two-column-slide__sub--accent {
  color: var(--clay);
}

.two-column-slide__list {
  font-size: 36px;
  line-height: 2;
  color: #332F27;
  padding-left: 1em;
  list-style: none;
}

.two-column-slide__divider {
  width: 2px;
  background: var(--ink);
  opacity: 0.15;
}
</style>
