import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook to initialize and manage Lenis smooth scroll with GSAP ScrollTrigger integration
 */
export const useLenis = (options = {}) => {
  useEffect(() => {
    const defaultOptions = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    }

    const lenis = new Lenis(defaultOptions)

    // Sync Lenis with GSAP and proxy scroll so pin/scrub use Lenis position
    lenis.on("scroll", ScrollTrigger.update)

    // Proxy window so ScrollTrigger uses Lenis scroll position (default scroller = window)
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
          return
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Refresh after everything initializes
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      lenis.destroy()
    }
  }, [])
}