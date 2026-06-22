<script setup lang="ts">
defineProps<{
  subtitle: string
  speaker: string
}>()
</script>

<template>
  <div class="tf-canvas title-card">
    <div class="title-top">
      <div class="tf-meta">
        <strong>$</strong> terraform apply --target=...
      </div>
      <div class="tf-stamp soft">DRAFT · LT</div>
    </div>

    <div class="title-main">
      <div class="title-display">
        <span class="title-line cmd">$ terraform</span>
        <span class="title-line cmd accent">&nbsp;&nbsp;apply</span>
      </div>
      <div class="title-tag">aws_route53domains_domain &quot;domain&quot;</div>
    </div>

    <div class="title-foot">
      <div class="tf-rule thick" />
      <div class="title-foot-row">
        <div class="title-foot-col">
          <div class="tf-meta">SPEAKER</div>
          <div class="title-foot-val">{{ speaker }}</div>
        </div>
        <div class="title-foot-col">
          <div class="tf-meta">VENUE</div>
          <div class="title-foot-val">{{ subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-card {
  justify-content: space-between;
}

.title-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 6px;
}

.title-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 1.4rem;
}

.title-display {
  font-family: var(--font-mono);
  font-weight: 900;
  font-size: 7.5rem;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--ink);
  display: flex;
  flex-direction: column;
}
.title-line.cmd { display: block; }
.title-line.accent { color: var(--tf-purple); }

.title-tag {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--ink-soft);
  border-left: 4px solid var(--tf-purple);
  padding-left: 0.9rem;
  font-weight: 700;
}

.title-foot {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 4px;
}
.title-foot-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
.title-foot-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title-foot-val {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.2rem;
  color: var(--ink);
}
</style>
