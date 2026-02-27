import { useState, useEffect } from 'react'

/**
 * Returns true when the user has scrolled past the given viewport percentage.
 * @param {number} viewportPercent - e.g. 10 for 10vh
 * @returns {boolean}
 */
export function useScrollPastViewport(viewportPercent = 8) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const thresholdPx = (window.innerHeight * viewportPercent) / 100
    const onScroll = () => setPast(window.scrollY >= thresholdPx)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [viewportPercent])

  return past
}
