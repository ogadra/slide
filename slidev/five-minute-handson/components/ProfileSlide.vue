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
  z-index: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

.profile-slide__main {
  flex: 1;
  padding: 130px 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-slide__name {
  font-weight: 900;
  font-size: 132px;
  line-height: 1.12;
  letter-spacing: -0.035em;
}

.profile-slide__links {
  margin-top: 72px;
  font-family: var(--font-mono);
  font-size: 36px;
  line-height: 2;
  color: var(--mute);
}

.profile-slide__mark {
  width: 660px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, rgba(63, 123, 224, 0.22), rgba(12, 21, 35, 0.9));
  border-left: 1px solid rgba(86, 225, 245, 0.28);
}

.profile-slide__avatar {
  width: 440px;
  height: 440px;
  object-fit: cover;
  border-radius: 50%;
  border: 8px solid rgba(86, 225, 245, 0.5);
  display: block;
}
</style>
