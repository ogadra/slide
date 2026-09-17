<script setup lang="ts">
import { ref } from 'vue'
import { ownText, texts, useAutoFit, wraps } from '../composables/useAutoFit'

const AVAIL = 680

const body = ref<HTMLElement | null>(null)

const em = useAutoFit(body, {
  max: 76,
  min: 40,
  fits: (el) => {
    if (el.scrollHeight > AVAIL) return false
    const lines = [
      ...[...el.querySelectorAll('li')].map(ownText),
      ...[...el.querySelectorAll('p')].flatMap(texts),
    ]
    return !lines.some((line) => (line ? wraps(line) : false))
  },
})
</script>

<template>
  <div class="bullet-slide">
    <div ref="body" class="bullet-slide__body" :style="{ fontSize: `${em}px` }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bullet-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 250px 100px 150px;
  box-sizing: border-box;
}

.bullet-slide__body {
  width: 100%;
}

.bullet-slide :deep(h2) {
  position: absolute;
  top: 56px;
  left: 100px;
  padding-bottom: 16px;
  border-bottom: 10px solid var(--cyan);
  font-weight: 900;
  font-size: 150px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bullet-slide :deep(p) {
  font-weight: 700;
  font-size: 0.86em;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--paper);
}

.bullet-slide :deep(ul),
.bullet-slide :deep(ol) {
  padding: 0;
  margin: 0;
  list-style: none;
}

.bullet-slide :deep(ol) {
  counter-reset: step;
}

.bullet-slide :deep(li) {
  position: relative;
  padding-left: 0.9em;
  font-weight: 700;
  font-size: 1em;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.bullet-slide :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.29em;
  height: 0.29em;
  background: var(--cyan);
}

.bullet-slide :deep(li + li) {
  margin-top: 0.58em;
}

.bullet-slide :deep(ol > li) {
  counter-increment: step;
  padding-left: 1.5em;
}

.bullet-slide :deep(ol > li)::before {
  content: counter(step);
  top: 0;
  width: auto;
  height: auto;
  background: none;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.92em;
  line-height: 1.3;
  color: var(--cyan);
}

.bullet-slide :deep(ul ul) {
  margin-top: 0.47em;
  padding-left: 1em;
}

.bullet-slide :deep(ul ul li)::before {
  top: 0.6em;
  width: 0.4em;
  height: 0.05em;
}

.bullet-slide :deep(ul ul li + li) {
  margin-top: 0.37em;
}

.bullet-slide :deep(.accent) {
  color: var(--cyan);
}

.bullet-slide :deep(p.big) {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 2.8em;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-align: center;
}
</style>
