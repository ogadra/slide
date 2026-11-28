<script setup lang="ts">
import logo from '../imgs/yapc-header-logo.svg'
</script>

<template>
  <footer class="deck-footer">
    <img :src="logo" alt="YAPC::Tokyo 2026" class="deck-footer-logo" />
    <span>それでも、DNSを冗長化したい</span>
    <div class="deck-footer-links">
      <Item text="ogadra">
        <carbon:logo-github />
      </Item>
      <Item text="const_myself">
        <carbon:logo-twitter />
      </Item>
      <Item text="slide.ogadra.com">
        <carbon:link />
      </Item>
    </div>
  </footer>
</template>

<style scoped>
.deck-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem 1rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--navy);
  background: #ffffff;
  border-top: 1px dashed var(--ink-soft);
}

.deck-footer-logo {
  height: 0.9rem;
  margin: 0;
}

.deck-footer-links {
  display: flex;
  margin-left: auto;
}
</style>
