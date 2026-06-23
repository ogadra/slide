<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  avatar: string
  links: { label: string; value: string }[]
}>()
</script>

<template>
  <div class="tf-canvas outro">
    <div class="outro-top">
      <div class="tf-meta">
        <strong>$</strong> terraform apply --target=thanks
      </div>
      <div class="tf-stamp soft">EOF</div>
    </div>

    <div class="outro-main">
      <div class="outro-left">
        <div class="outro-thanks">THANK<br/>YOU.</div>
        <div class="outro-rule" />
        <div class="outro-jp">ご清聴ありがとうございました</div>
      </div>

      <div class="outro-right">
        <div class="outro-card">
          <img class="outro-avatar" :src="avatar" :alt="name" />
          <div class="outro-name">{{ name }}</div>
          <div class="outro-handle">{{ handle }}</div>
          <div class="outro-rule inner" />
          <div class="outro-links">
            <div v-for="(l, i) in links" :key="i" class="outro-link">
              <span class="label">{{ l.label }}</span>
              <span class="value">{{ l.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outro {
  gap: 1.5rem;
}

.outro-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 6px;
}

.outro-main {
  flex: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: center;
}

.outro-left {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.outro-thanks {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 8.5rem;
  line-height: 0.86;
  letter-spacing: -0.04em;
  color: var(--ink);
  text-transform: uppercase;
}
.outro-thanks::first-line {
  color: var(--tf-purple);
}

.outro-rule {
  height: 2px;
  background: var(--ink);
  width: 60%;
}

.outro-jp {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.4rem;
  color: var(--ink);
}

.outro-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.outro-card {
  width: 100%;
  max-width: 380px;
  padding: 0.9rem 1.2rem;
  border: 2px solid var(--ink);
  background: var(--paper);
  box-shadow: 5px 5px 0 var(--ink);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.outro-avatar {
  width: 76px;
  height: 76px;
  border-radius: 9999px;
  border: 2px solid var(--ink);
  object-fit: cover;
  align-self: center;
}
.outro-name {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-align: center;
}
.outro-handle {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  color: var(--ink-soft);
  text-align: center;
  text-transform: lowercase;
}
.outro-card .outro-rule.inner {
  width: 100%;
  background: var(--ink);
  height: 1px;
  margin: 0.3rem 0;
}

.outro-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.outro-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 0.35rem;
  border-bottom: 1px dotted var(--rule);
}
.outro-link:last-child { border-bottom: none; }
.outro-link .label {
  color: var(--ink-soft);
  letter-spacing: 0.18em;
  font-size: 0.68rem;
  text-transform: uppercase;
}
.outro-link .value {
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.02em;
}
</style>
