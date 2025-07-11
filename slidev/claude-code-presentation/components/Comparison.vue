<template>
  <div class="comparison-container">
    <div class="comparison-column left-column">
      <h3>{{ leftTitle }}</h3>
      <slot name="left"></slot>
    </div>
    <div class="comparison-column right-column">
      <h3>{{ rightTitle }}</h3>
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
  padding-top: 0 !important;
  padding-bottom: 0.5rem !important;
  border-bottom: 2px solid currentColor;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  font-family: 'Fira Code', 'Rubik', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  letter-spacing: 0.05em;
  opacity: 1;
  text-shadow: 
    -1px -1px 2px #eee,
    1px -1px 2px #eee,
    -1px 1px 2px #eee,
    1px 1px 2px #eee,
    2px 0 2px #eee,
    -2px 0 2px #eee,
    0 2px 2px #eee,
    0 -2px 2px #eee;
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
