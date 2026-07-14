<template>
  <div class="problem-action-slide">
    <div class="problem-action-slide__problem">
      <slot name="problem" />
    </div>
    <div class="problem-action-slide__action">
      <div class="problem-action-slide__action-inner">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-action-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  overflow: hidden;
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.problem-action-slide__problem {
  flex: none;
  font-weight: 700;
  font-size: 84px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--ink-soft);
}

.problem-action-slide__action {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
}

.problem-action-slide__action-inner {
  font-weight: 700;
  font-size: 150px;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.problem-action-slide :deep(p) {
  margin: 0;
}

.problem-action-slide :deep(.accent) {
  color: var(--clay);
}
</style>
