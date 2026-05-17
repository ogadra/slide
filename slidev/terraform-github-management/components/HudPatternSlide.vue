<script setup lang="ts">
defineProps<{
  title: string
  patterns: {
    no: string
    title: string
    code: string
    body: string
    freq: string
    severity: string
    tone: 'default' | 'green' | 'red' | 'orange'
  }[]
}>()

const numClass = (tone: string) => {
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  if (tone === 'green') return 'hud-green'
  return ''
}
const sevClass = numClass
</script>

<template>
  <HudSlide>
    <div class="wrapper">
      <div class="page-title">{{ title }}</div>
      <div class="patterns-grid">
        <HudPanel
          v-for="p in patterns"
          :key="p.no"
          :label="`[ PATTERN ${p.no} ]`"
          panel-class="p-4 pattern-card"
        >
          <div class="main">
            <div class="head">
              <div class="num" :class="numClass(p.tone)">{{ p.no }}</div>
              <div>
                <div class="title">{{ p.title }}</div>
                <div class="code">{{ p.code }}</div>
              </div>
            </div>
            <div class="body" v-html="p.body" />
          </div>
          <div class="side">
            <div class="side-block">
              <div class="side-label">FREQ</div>
              <div class="side-value">{{ p.freq }}</div>
            </div>
            <div class="side-block">
              <div class="side-label">SEVERITY</div>
              <div class="side-value" :class="sevClass(p.tone)">{{ p.severity }}</div>
            </div>
          </div>
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
  font-family: 'Bodoni Moda', serif;
  font-weight: 900;
  font-size: 3rem;
  margin-top: 0.5rem;
}
.patterns-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  flex: 1;
}

.pattern-card :deep(.hud-panel),
.pattern-card {
  display: flex !important;
  flex-direction: row !important;
  gap: 1rem;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  border-left: 1px solid #1a1a1a;
  padding-left: 1rem;
  min-width: 80px;
}
.side-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.side-label {
  font-size: 9px;
  letter-spacing: 0.3em;
  opacity: 0.6;
  font-family: 'JetBrains Mono', monospace;
}
.side-value {
  font-family: 'Bodoni Moda', serif;
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.1;
}

.head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.num {
  font-family: 'Bodoni Moda', serif;
  font-weight: 900;
  font-size: 3.5rem;
  line-height: 1;
}
.title {
  font-size: 1.875rem;
  font-weight: 900;
  line-height: 1.2;
}
.code {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 0.15em;
  margin-top: 0.25rem;
}
.body {
  font-size: 1.25rem;
  margin-top: 0.75rem;
  line-height: 1.5;
}
</style>
