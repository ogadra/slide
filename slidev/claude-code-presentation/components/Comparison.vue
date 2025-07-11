<template>
  <div class="comparison-container">
    <div class="comparison-column left-column">
      <h3>
        <span class="text-back">{{ leftTitle }}</span>
        <span class="text-front">{{ leftTitle }}</span>
      </h3>
      <slot name="left"></slot>
    </div>
    <div class="comparison-column right-column">
      <h3>
        <span class="text-back">{{ rightTitle }}</span>
        <span class="text-front">{{ rightTitle }}</span>
      </h3>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  leftTitle: {
    type: String,
    default: '従来のツール'
  },
  rightTitle: {
    type: String,
    default: 'Claude Code'
  }
})
</script>

<style scoped>
.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 0.25rem 0;
}

.comparison-column {
  padding: 0.75rem;
  border-radius: 0.5rem;
  height: 100%;
}

.left-column {
  background-color: rgba(239, 68, 68, 0.05);
  border: 2px solid rgba(239, 68, 68, 0.5);
}

.right-column {
  background-color: rgba(59, 130, 246, 0.05);
  border: 2px solid rgba(59, 130, 246, 0.5);
}

.comparison-column h3 {
  font-size: 2rem !important;
  margin: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  border-bottom: 2px solid currentColor;
  text-align: center;
  position: relative;
  height: 2.5rem;
  font-family: 'Fira Code', 'Rubik', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  letter-spacing: 0.05em;
  opacity: 1;
}

.text-back {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  -webkit-text-stroke: 2.5px #fff;
  text-stroke: 2.5px #fff;
  z-index: 0;
  white-space: nowrap;
  font-family: 'Fira Code', 'Rubik', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  opacity: 0.95;
}

.text-front {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  white-space: nowrap;
  font-family: 'Fira Code', 'Rubik', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
}

.left-column h3 {
  color: #ef4444;
}

.right-column h3 {
  color: #3b82f6;
}

.comparison-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-column li {
  font-size: 1.25rem !important;
  line-height: 2 !important;
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.comparison-column li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-size: 1.5rem;
}

.left-column li::before {
  color: #ef4444;
}

.right-column li::before {
  color: #3b82f6;
}
</style>
