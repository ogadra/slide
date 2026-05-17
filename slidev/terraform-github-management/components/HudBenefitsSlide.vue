<script setup lang="ts">
defineProps<{
  title: string
  benefits: {
    id: string
    icon: string
    title: string
    code: string
    note: string
  }[]
}>()
</script>

<template>
  <HudSlide>
    <div class="wrapper">
      <div class="page-title">{{ title }}</div>
      <div class="grid" :class="`cols-${benefits.length}`">
        <HudPanel
          v-for="b in benefits"
          :key="b.id"
          :label="`[ ${b.id} ]`"
          panel-class="p-3 flex flex-col"
        >
          <div class="icon">{{ b.icon }}</div>
          <div class="b-title" v-html="b.title" />
          <div class="b-code">{{ b.code }}</div>
          <div class="b-note">{{ b.note }}</div>
        </HudPanel>
      </div>
    </div>
  </HudSlide>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}
.page-title {
  font-weight: 900;
  font-size: 2.5rem;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}
.grid {
  display: grid;
  gap: 0.75rem;
  flex: 1;
}
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.icon {
  font-weight: 900;
  font-size: 2.5rem;
  color: #0a7a3a;
  margin-top: 1rem;
  line-height: 1;
}
.b-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 0.75rem;
  line-height: 1.2;
}
.b-code {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 0.15em;
  margin-top: 0.5rem;
}
.b-note {
  font-size: 1rem;
  margin-top: auto;
  border-top: 1px solid #1a1a1a;
  padding-top: 0.5rem;
  line-height: 1.5;
}
</style>
