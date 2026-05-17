<script setup lang="ts">
// HUDのコンテナ。共通の枠線・四隅ブラケット・ヘッダー/フッターは
// global-top.vue 側に統一されている。本コンポーネントは中身領域だけを提供する。
</script>

<template>
  <div class="hud-root">
    <div class="hud-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hud-body {
  position: absolute;
  top: 50px;
  bottom: 90px;
  left: 60px;
  right: 60px;
}

</style>
