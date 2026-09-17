import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const visible = (el: HTMLElement) =>
  new Promise<void>((resolve) => {
    if (el.getBoundingClientRect().width > 0) return resolve()
    const observer = new ResizeObserver(() => {
      if (el.getBoundingClientRect().width > 0) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(el)
  })

export const wraps = (node: Node) => {
  const range = document.createRange()
  range.selectNodeContents(node)
  return range.getClientRects().length > 1
}

export const ownText = (li: Element) =>
  [...li.childNodes].find((node) => node.nodeType === 3 && node.textContent?.trim())

export const texts = (el: Element) => {
  const out: Text[] = []
  const walk = (node: Node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3 && child.textContent?.trim()) out.push(child as Text)
      else if (child.nodeType === 1) walk(child)
    })
  }
  walk(el)
  return out
}

type Options = {
  max: number
  min: number
  step?: number
  fits: (el: HTMLElement) => boolean
}

export const useAutoFit = (target: Ref<HTMLElement | null>, { max, min, step = 2, fits }: Options) => {
  const em = ref(max)

  onMounted(async () => {
    const el = target.value
    if (!el) return

    await document.fonts.ready
    await visible(el)

    let size = max
    for (; size > min; size -= step) {
      el.style.fontSize = `${size}px`
      if (fits(el)) break
    }
    em.value = size
  })

  return em
}
