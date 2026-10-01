// The print page never fetches CJK unicode-range subsets on its own.
export function loadPrintFonts() {
  if (!location.pathname.endsWith('/print') && !location.search.includes('print=')) return
  let len = -1
  let stable = 0
  const id = setInterval(() => {
    const text = document.body.innerText
    if (!text) return
    stable = text.length === len ? stable + 1 : 0
    if (stable > 30) return clearInterval(id)
    len = text.length
    document.fonts.forEach((f) => {
      void document.fonts.load(`${f.style} ${f.weight} 16px "${f.family}"`, text).catch(() => [])
    })
  }, 200)
}

export default function setup() {
  loadPrintFonts()
}
