<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  accent?: string
  mode?: 'slam' | 'flip' | 'rise' | 'pop' | 'type' | 'drop'
  delay?: number
  stagger?: number
}>()

const parts = computed(() => {
  const accent = props.accent ?? ''
  const start = accent ? props.text.indexOf(accent) : -1
  return Array.from(props.text).map((ch, i) => ({
    ch,
    accent: start >= 0 && i >= start && i < start + accent.length,
  }))
})
</script>

<template>
  <span
    class="kline"
    :class="`kline--${mode ?? 'slam'}`"
    :style="{ '--kd': `${delay ?? 0}s`, '--ks': `${stagger ?? 0.13}s` }"
  >
    <span
      v-for="(part, i) in parts"
      :key="i"
      class="kline__ch"
      :class="{ 'kline__ch--accent': part.accent }"
      :style="{ '--i': i }"
    >{{ part.ch === ' ' ? ' ' : part.ch }}</span>
  </span>
</template>

<style scoped>
.kline {
  display: inline-block;
  white-space: nowrap;
  perspective: 900px;
}

.kline__ch {
  display: inline-block;
  animation-delay: calc(var(--kd) + var(--i) * var(--ks));
  animation-fill-mode: both;
}

.kline__ch--accent {
  color: var(--kline-accent, var(--neon));
  text-shadow: var(--kline-accent-shadow, none);
}

.kline--slam .kline__ch {
  animation-name: kline-slam;
  animation-duration: 0.9s;
  animation-timing-function: cubic-bezier(0.2, 1.4, 0.3, 1);
}

@keyframes kline-slam {
  from {
    opacity: 0;
    transform: scale(2.8) rotate(9deg);
    filter: blur(10px);
  }
  60% {
    opacity: 1;
    filter: blur(0);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0);
  }
}

.kline--flip .kline__ch {
  transform-origin: 50% 100%;
  animation-name: kline-flip;
  animation-duration: 1.05s;
  animation-timing-function: cubic-bezier(0.3, 1.3, 0.4, 1);
}

@keyframes kline-flip {
  from {
    opacity: 0;
    transform: rotateX(-95deg) translateY(30px);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) translateY(0);
  }
}

.kline--rise .kline__ch {
  animation-name: kline-rise;
  animation-duration: 0.95s;
  animation-timing-function: cubic-bezier(0.2, 1.2, 0.3, 1);
}

@keyframes kline-rise {
  from {
    opacity: 0;
    transform: translateY(1.2em) skewY(6deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) skewY(0deg);
  }
}

.kline--pop .kline__ch {
  animation-name: kline-pop;
  animation-duration: 0.85s;
  animation-timing-function: cubic-bezier(0.3, 1.6, 0.4, 1);
}

@keyframes kline-pop {
  from {
    opacity: 0;
    transform: scale(0) rotate(-12deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.kline--type .kline__ch {
  animation-name: kline-type;
  animation-duration: 0.5s;
  animation-timing-function: steps(1, end);
}

@keyframes kline-type {
  0% {
    opacity: 0;
    filter: brightness(1);
  }
  1% {
    opacity: 1;
    filter: brightness(2.4);
  }
  100% {
    opacity: 1;
    filter: brightness(1);
  }
}

.kline--drop .kline__ch {
  animation-name: kline-drop;
  animation-duration: 1.05s;
  animation-timing-function: cubic-bezier(0.5, 0, 0.6, 1);
}

@keyframes kline-drop {
  0% {
    opacity: 0;
    transform: translateY(-1.4em);
  }
  55% {
    opacity: 1;
    transform: translateY(0.08em) scaleY(0.92);
  }
  75% {
    transform: translateY(-0.1em) scaleY(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}
</style>
