<template>
  <div class="aside-slide">
    <p class="aside-slide__text">
      <slot />
    </p>
  </div>
</template>

<style scoped>
/* ト書き用。声に出さない一枚なので、本文より一段落とす */
.aside-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.aside-slide__text {
  font-weight: 500;
  font-size: 72px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--mute);
  text-align: center;
}

.aside-slide :deep(.accent) {
  color: var(--cyan);
}
</style>
