import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Custom hook to initialize and manage Lenis smooth scroll with GSAP ScrollTrigger integration
 * Sets up Lenis globally for the entire site
 * @param {Object} options - Lenis configuration options
 */
export const useLenis = (options = {}) => {
  useEffect(() => {
    const defaultOptions = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    }

    // Initialize Lenis
    const lenis = new Lenis(defaultOptions)

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use requestAnimationFrame for smooth scrolling
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, []) // Empty dependency array - Lenis is initialized once globally
}
