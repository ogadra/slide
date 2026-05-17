export type HudTone = 'default' | 'green' | 'red' | 'orange'

export const hudToneClass = (tone?: string): string => {
  if (tone === 'green') return 'hud-green'
  if (tone === 'red') return 'hud-red'
  if (tone === 'orange') return 'hud-orange'
  return ''
}

export const hudToneFill = (tone?: string): string => {
  if (tone === 'green') return '#0a7a3a'
  if (tone === 'red') return '#cc1100'
  if (tone === 'orange') return '#cc4400'
  return '#1a1a1a'
}
