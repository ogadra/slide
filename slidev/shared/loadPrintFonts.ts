// Print fetches no CJK subsets itself; load all faces up front so late text causes no reflow.
export function loadPrintFonts() {
  if (!location.pathname.endsWith('/print') && !location.search.includes('print=')) return
  const style = document.createElement('style')
  style.textContent = '* { transition: none !important }'
  document.head.append(style)
  let calm = 0
  const id = setInterval(() => {
    let pending = 0
    document.fonts.forEach((f) => {
      if (f.status === 'unloaded') void f.load().catch(() => {})
      if (f.status !== 'loaded') pending++
    })
    calm = pending ? 0 : calm + 1
    if (document.readyState === 'complete' && calm > 10) clearInterval(id)
  }, 200)
}

export default function setup() {
  loadPrintFonts()
}
