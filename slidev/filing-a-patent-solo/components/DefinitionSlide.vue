<script setup lang="ts">
import { ref } from 'vue'
import { useAutoFit, wraps } from '../composables/useAutoFit'

type Item = {
  term: string
  body: string
}

defineProps<{ heading: string; items: Item[] }>()

const body = ref<HTMLElement | null>(null)

const em = useAutoFit(body, {
  max: 64,
  min: 36,
  fits: (el) => ![...el.querySelectorAll('.definition__body')].some(wraps),
})
</script>

<template>
  <div class="definition">
    <h2 class="definition__heading">{{ heading }}</h2>

    <div ref="body" class="definition__list" :style="{ fontSize: `${em}px` }">
      <div v-for="(item, i) in items" :key="i" class="definition__item">
        <span class="definition__term">{{ item.term }}</span>
        <p class="definition__body">{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.definition {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 250px 120px 150px;
  box-sizing: border-box;
}

.definition__heading {
  position: absolute;
  top: 56px;
  left: 120px;
  padding-bottom: 16px;
  border-bottom: 10px solid var(--cyan);
  font-weight: 900;
  font-size: 150px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.definition__list {
  width: 100%;
}

.definition__item + .definition__item {
  margin-top: 1.4em;
}

.definition__term {
  display: inline-block;
  padding: 0.2em 0.42em;
  background: var(--cyan);
  font-weight: 900;
  font-size: 0.85em;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--void);
}

.definition__body {
  margin-top: 0.42em;
  padding-left: 0.1em;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--paper);
  white-space: nowrap;
}
</style>
