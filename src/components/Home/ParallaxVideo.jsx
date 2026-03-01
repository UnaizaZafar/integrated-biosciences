import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Hero from "./Hero"
import heroVideo from "../../assets/integrated-loop-optimized.mp4"
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport"
import HorizontalScroll from "./HorizontalScroll"

const SCROLL_THRESHOLD_VH = 10

export default function ParallaxVideo({ onIntroComplete }) {
  const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH)
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const [videoInView, setVideoInView] = useState(true)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => onIntroComplete?.(),
        })
        tl.from(".parallaxVideo-video", {        // ← target the fixed div directly
          scale: 0.6,                            // start at 60%, not 0
          opacity: 0,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.out",
        }).from(".parallaxVideo-wrapper", {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.out",
        }).from(
          ".parallaxVideo-children",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
      }, sectionRef)
      return () => ctx.revert()
    },
    { scope: sectionRef, dependencies: [] }
  )

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
        ref={wrapperRef}
        className="parallaxVideo-wrapper relative min-h-screen"
      >
        <div
          className={`parallaxVideo-video fixed inset-0 z-0 overflow-hidden transition-[margin,border-radius,opacity] duration-500 ease-in-out ${scrolledPast10vh ? "m-0 rounded-none" : "m-3 rounded-xl"} ${videoInView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
    </div>
  )
}