<template>
  <div class="statement-slide">
    <h2 class="statement-slide__title">
      <slot />
    </h2>
  </div>
</template>

<style scoped>
.statement-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.statement-slide__title {
  font-weight: 700;
  font-size: 120px;
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.statement-slide :deep(.accent) {
  color: var(--cyan);
}
</style>
