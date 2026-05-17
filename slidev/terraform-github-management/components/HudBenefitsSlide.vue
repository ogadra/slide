<script setup lang="ts">
defineProps<{
  title: string
  benefits: {
    id: string
    title: string
    before: string
    after: string
  }[]
}>()

// 装飾的なメタラベル。id とセットで紐付ける。
const codeById: Record<string, string> = {
  'B-01': 'BRANCH PROTECT / etc.',
  'B-02': 'TFLINT / VALIDATE',
  'B-03': 'PULL REQUEST',
}
</script>

<template>
  <HudSlide>
    <div class="b-grid">
      <!-- TOP: タイトル -->
      <HudPanel label="[ SECTION / BENEFITS ]" panel-class="col-span-12 row-span-1 p-3 flex items-center">
        <div class="page-title">{{ title }}</div>
        <div class="axis">
          <span class="axis-label">BEFORE</span>
          <span class="axis-arrow">▸▸▸</span>
          <span class="axis-label after">AFTER</span>
        </div>
      </HudPanel>

      <!-- MIDDLE: 3カード -->
      <HudPanel
        v-for="b in benefits"
        :key="b.id"
        :label="`[ ${b.id} ]`"
        panel-class="col-span-4 row-span-6 p-3 flex flex-col"
      >
        <div class="b-title" v-html="b.title" />
        <div class="b-code">{{ codeById[b.id] }}</div>
        <div class="ba">
          <div class="ba-row before">
            <span class="ba-mark">×</span>
            <span class="ba-text">{{ b.before }}</span>
          </div>
          <div class="ba-arrow">↓</div>
          <div class="ba-row after">
            <span class="ba-mark">○</span>
            <span class="ba-text">{{ b.after }}</span>
          </div>
        </div>
      </HudPanel>

      <!-- BOTTOM: メタパネル -->
      <HudPanel label="[ COMMAND ]" panel-class="col-span-6 row-span-2 px-3 py-1 flex items-center">
        <div class="meta-row">
          <span class="meta-key">FLOW</span>
          <div class="meta-list mono">
            <div>$ terraform plan</div>
            <div>$ gh pr review</div>
            <div>$ terraform apply</div>
          </div>
        </div>
      </HudPanel>

      <HudPanel label="[ STACK ]" panel-class="col-span-6 row-span-2 px-3 py-1 flex items-center">
        <div class="meta-row">
          <span class="meta-key">TOOLS</span>
          <div class="meta-list">
            <div>tflint</div>
            <div>checkov</div>
            <div>terraform-provider-github</div>
          </div>
        </div>
      </HudPanel>
    </div>
  </HudSlide>
</template>

<style scoped>
.b-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, minmax(0, 1fr));
  gap: 0.5rem;
  height: 100%;
}
.b-grid :deep(.hud-panel) {
  min-height: 0;
}
.page-title {
  font-weight: 900;
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  margin-right: auto;
}
.axis {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 12px;
  letter-spacing: 0.3em;
  font-weight: 700;
}
.axis-label { color: #cc1100; }
.axis-label.after { color: #0a7a3a; }
.axis-arrow {
  font-size: 16px;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.b-title {
  font-size: 2rem;
  font-weight: 900;
  margin-top: .75rem;
  margin-bottom: .5rem;
  line-height: 1.2;
  margin-left: .25rem;
}
.b-code {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 0.15em;
  margin-top: 0.3rem;
  margin-left: .25rem;
}
.ba {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-top: 1px solid #1a1a1a;
  padding-top: 0.5rem;
}
.ba-row {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.35;
}
.ba-mark {
  font-weight: 900;
  font-size: 1.15rem;
  line-height: 1.1;
  flex-shrink: 0;
  width: 1.1rem;
}
.ba-row.before .ba-mark { color: #cc1100; }
.ba-row.before .ba-text { opacity: 0.65; text-decoration: line-through; }
.ba-row.after .ba-mark { color: #0a7a3a; }
.ba-row.after .ba-text { font-weight: 700; }
.ba-arrow {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 900;
  color: #cc4400;
  line-height: 1;
  opacity: 0.7;
  margin: 0.1rem 0;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  width: 100%;
}
.meta-row.signal { justify-content: space-between; }
.meta-key {
  font-size: 10px;
  letter-spacing: 0.3em;
  opacity: 0.55;
  font-weight: 700;
}
.meta-val {
  font-weight: 700;
}
.meta-list {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.4;
}
.meta-list.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}
.bar {
  display: inline-block;
  flex: 1;
  height: 0.6rem;
  background: rgba(26, 26, 26, 0.12);
  position: relative;
}
.bar-fill {
  display: block;
  height: 100%;
  background: #0a7a3a;
}
</style>
