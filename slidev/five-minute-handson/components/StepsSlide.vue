<script setup lang="ts">
// activeは1始まり。渡さなければどの手も強調しない
withDefaults(defineProps<{ steps: string[]; active?: number }>(), { active: 0 })
</script>

<template>
  <div class="steps-slide">
    <ol class="steps-slide__list">
      <li
        v-for="(step, i) in steps"
        :key="i"
        class="steps-slide__step"
        :class="{ 'steps-slide__step--on': active === i + 1 }"
      >
        <span class="steps-slide__no">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="steps-slide__text">{{ step }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.steps-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.steps-slide__list {
  width: 100%;
}

.steps-slide__step {
  display: flex;
  align-items: baseline;
  gap: 48px;
  padding: 40px 0;
  border-bottom: 1px solid rgba(97, 128, 159, 0.28);
  color: var(--mute);
}

.steps-slide__step:last-child {
  border-bottom: 0;
}

.steps-slide__no {
  font-family: var(--font-mono);
  font-size: 44px;
  letter-spacing: 0.08em;
}

.steps-slide__text {
  font-weight: 700;
  font-size: 76px;
  letter-spacing: -0.02em;
}

.steps-slide__step--on {
  color: var(--paper);
  border-bottom-color: rgba(86, 225, 245, 0.55);
}

.steps-slide__step--on .steps-slide__no {
  color: var(--cyan);
}
</style>
