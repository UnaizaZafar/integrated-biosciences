import { useEffect, useRef, useState } from "react"
import Hero from "./Hero"
import heroVideo from "../../assets/integrated-loop-optimized.mp4"
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport"
import HorizontalScroll from "./HorizontalScroll"

const SCROLL_THRESHOLD_VH = 10

export default function ParallaxVideo({ onIntroComplete }) {
  const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH)
  const sectionRef = useRef(null)
  const completedRef = useRef(false)
  const [videoInView, setVideoInView] = useState(true)

  const completeIntro = () => {
    if (completedRef.current || !onIntroComplete) return
    completedRef.current = true
    onIntroComplete()
  }

  // Complete when user scrolls past threshold (once overflow is allowed)
  useEffect(() => {
    if (scrolledPast10vh) completeIntro()
  }, [scrolledPast10vh])

  // Complete after delay so intro unlocks and page can scroll (avoids overflow-hidden catch-22)
  useEffect(() => {
    const t = setTimeout(completeIntro, 2500)
    return () => clearTimeout(t)
  }, [])

  // Complete on first interaction so user can skip immediately
  useEffect(() => {
    const handleInteraction = () => completeIntro()
    window.addEventListener("click", handleInteraction, { once: true, passive: true })
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true })
    window.addEventListener("keydown", handleInteraction, { once: true })
    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      setVideoInView(rect.bottom > 0)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative min-h-fit">
      <div
        className={`fixed inset-0 z-0 overflow-hidden transition-[margin,border-radius,opacity] duration-500 ease-in-out ${scrolledPast10vh ? "m-0 rounded-none" : "m-3 rounded-xl"} ${videoInView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10">
        <Hero />
        <HorizontalScroll />
      </div>
    </div>
  )
}