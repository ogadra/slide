<script setup lang="ts">
import { computed } from 'vue'

type Item = {
  months: number
  label: string
  jpo?: boolean
}

const props = defineProps<{ heading: string; items: Item[] }>()

const TRACK = 1440
const ROOM = 240
const LANE = 72
const BASE = 26
const NUDGE = 14
const GAP = 24
const LABEL_EM = 48
const PERIOD_EM = 32

const measure = (text: string, em: number) =>
  [...text].reduce((w, ch) => w + (ch === ' ' ? 0.3 : /[\x21-\x7e]/.test(ch) ? 0.6 : 1) * em, 0) +
  text.length * 0.02 * em

const nodes = computed(() => {
  const at = props.items.map((item) => item.months)
  const span = at[at.length - 1] - at[0] || 1

  const list = props.items.map((item, i) => {
    const elapsed = `${item.months}ヶ月`
    const x = ((at[i] - at[0]) / span) * TRACK
    const width = measure(elapsed, PERIOD_EM) + NUDGE + measure(item.label, LABEL_EM)
    const flip = x + NUDGE + width > TRACK + ROOM || x > TRACK * 0.8
    const left = flip ? x - NUDGE - width : x + NUDGE
    return {
      elapsed,
      label: item.label,
      side: item.jpo ? 'down' : 'up',
      x,
      left,
      right: left + width,
      flip,
      lead: 0,
      offset: {} as Record<string, string>,
    }
  })

  const order = [...list.filter((n) => n.side === 'up').reverse(), ...list.filter((n) => n.side === 'down')]
  const taken: Record<string, { lane: number; left: number; right: number }[]> = { up: [], down: [] }
  for (const node of order) {
    const lane = taken[node.side].reduce(
      (deep, o) => (o.left < node.right + GAP && node.left < o.right + GAP ? Math.max(deep, o.lane + 1) : deep),
      0,
    )
    taken[node.side].push({ lane, left: node.left, right: node.right })

    const shift = BASE + lane * LANE
    node.lead = shift
    node.offset = {
      [node.side === 'down' ? 'top' : 'bottom']: `${shift}px`,
      [node.flip ? 'right' : 'left']: '-1px',
      [node.flip ? 'paddingRight' : 'paddingLeft']: `${NUDGE}px`,
    }
  }

  return list
})
</script>

<template>
  <div class="timeline">
    <h2 class="timeline__heading">{{ heading }}</h2>

    <div class="timeline__track">
      <i class="timeline__axis" />
      <i class="timeline__head" />

      <div
        v-for="(node, i) in nodes"
        :key="i"
        class="timeline__node"
        :class="[`timeline__node--${node.side}`, node.flip && 'timeline__node--flip']"
        :style="{ left: `${node.x}px` }"
      >
        <i class="timeline__lead" :style="{ height: `${node.lead}px` }" />
        <i class="timeline__dot" />

        <div class="timeline__box" :style="node.offset">
          <span class="timeline__period">{{ node.elapsed }}</span>
          <span class="timeline__label">{{ node.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  --jpo: #f5b356;

  position: absolute;
  inset: 0;
  z-index: 1;
}

.timeline__heading {
  position: absolute;
  top: 56px;
  left: 100px;
  padding-bottom: 16px;
  border-bottom: 10px solid var(--cyan);
  font-weight: 900;
  font-size: 150px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.timeline__track {
  position: absolute;
  left: 170px;
  top: 640px;
  width: 1440px;
  height: 0;
}

.timeline__axis {
  position: absolute;
  left: -80px;
  right: -20px;
  top: -1px;
  height: 2px;
  background: rgba(230, 239, 248, 0.35);
}

.timeline__head {
  position: absolute;
  right: -42px;
  top: -11px;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 22px solid rgba(230, 239, 248, 0.35);
}

.timeline__node {
  position: absolute;
  top: 0;
  width: 0;
}

.timeline__dot {
  position: absolute;
  top: -13px;
  left: -13px;
  width: 26px;
  height: 26px;
  border: 3px solid var(--cyan);
  border-radius: 50%;
  background: var(--void);
  box-sizing: border-box;
}

.timeline__lead {
  position: absolute;
  left: -1px;
  width: 2px;
  background: rgba(86, 225, 245, 0.4);
}

.timeline__node--up .timeline__lead {
  bottom: 0;
}

.timeline__node--down .timeline__lead {
  top: 0;
}

.timeline__box {
  position: absolute;
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 0 10px;
  border-bottom: 2px solid rgba(86, 225, 245, 0.4);
  background: var(--void);
  line-height: 1.15;
  white-space: nowrap;
}

.timeline__node--down .timeline__box {
  border-color: rgba(245, 179, 86, 0.4);
  border-left: 2px solid rgba(245, 179, 86, 0.4);
}

.timeline__node--down.timeline__node--flip .timeline__box {
  border-left: 0;
  border-right: 2px solid rgba(245, 179, 86, 0.4);
}

.timeline__period {
  font-family: var(--font-mono);
  font-size: 32px;
  letter-spacing: 0.02em;
  color: var(--mute);
}

.timeline__label {
  font-weight: 700;
  font-size: 48px;
  letter-spacing: 0.02em;
  color: var(--paper);
}

.timeline__node--down .timeline__dot {
  border-color: var(--jpo);
  background: var(--jpo);
}

.timeline__node--down .timeline__lead {
  background: rgba(245, 179, 86, 0.4);
}

.timeline__node--down .timeline__period,
.timeline__node--down .timeline__label {
  color: var(--jpo);
}
</style>
