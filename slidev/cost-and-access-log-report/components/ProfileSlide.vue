<script setup lang="ts">
defineProps<{
  name: string
  avatar: string
  lines: string[]
}>()
</script>

<template>
  <div class="profile-slide">
    <div class="profile-slide__main">
      <h2 class="profile-slide__name">{{ name }}</h2>
      <div class="profile-slide__links">
        <div v-for="(line, i) in lines" :key="i">{{ line }}</div>
      </div>
    </div>
    <div class="profile-slide__mark">
      <img :src="avatar" alt="" class="profile-slide__avatar" />
    </div>
  </div>
</template>

<style scoped>
.profile-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  background: var(--base);
  color: var(--ink);
  overflow: hidden;
}

.profile-slide__main {
  flex: 1;
  padding: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-slide__name {
  font-weight: 700;
  font-size: 132px;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.profile-slide__links {
  margin-top: 72px;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 36px;
  line-height: 2;
  color: var(--ink-soft);
}

.profile-slide__mark {
  width: 660px;
  background: var(--tan);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-slide__avatar {
  width: 440px;
  height: 440px;
  object-fit: cover;
  border-radius: 50%;
  border: 12px solid var(--tan-deep);
  display: block;
}
</style>
