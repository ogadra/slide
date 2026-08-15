import { computed, ref, unref } from 'vue'
import { onSlideEnter, useSlideContext } from '@slidev/client'

/**
 * Restartable animation stage.
 * `live` is true while the slide is the current one (always true when
 * rendering statically, e.g. print/export), and `take` increments on every
 * slide entry so it can be used as a `:key` to remount and replay CSS
 * animations.
 */
export function useStage() {
  const { $slidev, $page, $renderContext } = useSlideContext()
  const take = ref(0)

  onSlideEnter(() => {
    take.value++
  })

  const live = computed(() => {
    const context = unref($renderContext)
    if (context !== 'slide' && context !== 'presenter')
      return true
    return unref($slidev.nav.currentPage) === unref($page)
  })

  return { live, take }
}
