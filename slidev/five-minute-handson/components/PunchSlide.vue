<template>
  <div class="punch-slide">
    <div class="punch-slide__glow" />
    <h2 class="punch-slide__title">
      <slot />
    </h2>
  </div>
</template>

<style scoped>
.punch-slide {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.punch-slide__glow {
  position: absolute;
  right: -420px;
  bottom: -420px;
  width: 1500px;
  height: 1500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(63, 123, 224, 0.20), transparent 62%);
  pointer-events: none;
}

.punch-slide__title {
  position: relative;
  font-weight: 900;
  font-size: 250px;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--cyan);
  text-shadow: 0 0 110px rgba(86, 225, 245, 0.35);
}
</style>
