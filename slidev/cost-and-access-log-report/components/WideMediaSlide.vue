<template>
  <div class="wide-media-slide">
    <div class="wide-media-slide__problem">
      <slot name="problem" />
    </div>
    <div class="wide-media-slide__action">
      <slot name="action" />
    </div>
    <figure class="wide-media-slide__media">
      <slot name="media" />
    </figure>
  </div>
</template>

<style scoped>
.wide-media-slide {
  position: absolute;
  inset: 0;
  background: var(--base);
  color: var(--ink);
  overflow: hidden;
  padding: 130px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.wide-media-slide__problem {
  flex: none;
  font-weight: 700;
  font-size: 84px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--ink-soft);
}

.wide-media-slide__action {
  flex: none;
  font-weight: 700;
  font-size: 46px;
  line-height: 1.6;
  letter-spacing: -0.02em;
}

.wide-media-slide__media {
  flex: 1 1 auto;
  min-height: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wide-media-slide__media :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  background: #FFFFFF;
  border: 8px solid var(--ink);
  box-sizing: border-box;
}

.wide-media-slide :deep(p) {
  margin: 0;
}

.wide-media-slide :deep(.accent) {
  color: var(--clay);
  font-size: 72px;
}
</style>
