<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { type SupportedLocale, setLocale } from "../setup/i18n";

const { locale } = useI18n();

const currentLocale = computed(() => locale.value as SupportedLocale);

const toggleLocale = () => {
	const next = currentLocale.value === "ja" ? "en" : "ja";
	setLocale(next);
	localStorage.setItem("lang", next);
};

const titleText = computed(() =>
	currentLocale.value === "ja" ? "Switch to English" : "日本語に切り替え"
);
</script>

<template>
  <button
    class="translate-btn"
    @click="toggleLocale"
    :title="titleText"
  >
    <span class="label">{{ titleText }}</span>
  </button>
</template>

<style scoped>
.translate-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: auto;
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(180deg, rgba(40, 40, 40, 0.95), rgba(25, 25, 25, 0.95));
  border: 2px solid #4ec9b0;
  border-radius: 24px;
  color: #4ec9b0;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow:
    0 4px 0 rgba(78, 201, 176, 0.3),
    0 6px 12px rgba(0, 0, 0, 0.3);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(8px);
}

.translate-btn:hover {
  background: linear-gradient(180deg, rgba(78, 201, 176, 0.15), rgba(78, 201, 176, 0.1));
  border-color: #6ee7c2;
  transform: translateY(-1px);
  box-shadow:
    0 5px 0 rgba(78, 201, 176, 0.4),
    0 8px 16px rgba(0, 0, 0, 0.3);
}

.translate-btn:active {
  transform: translateY(3px);
  box-shadow:
    0 1px 0 rgba(78, 201, 176, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

.label {
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 800;
  letter-spacing: 0.02em;
}
</style>
