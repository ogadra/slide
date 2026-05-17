export type HudTone = 'default' | 'green' | 'red' | 'orange'

// class と fill を1つのテーブルで紐づける。tone追加時は1箇所だけ触ればよい。
const HUD_TONE_TABLE: Record<HudTone, { class: string; fill: string }> = {
  default: { class: '', fill: '#1a1a1a' },
  green:   { class: 'hud-green', fill: '#0a7a3a' },
  red:     { class: 'hud-red', fill: '#cc1100' },
  orange:  { class: 'hud-orange', fill: '#cc4400' },
}

export const hudToneClass = (tone?: HudTone): string =>
  HUD_TONE_TABLE[tone ?? 'default'].class

export const hudToneFill = (tone?: HudTone): string =>
  HUD_TONE_TABLE[tone ?? 'default'].fill
