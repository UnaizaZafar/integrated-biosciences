import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const MARQUEE_TEXT = "Rewriting the biology of aging – "

export default function MarqueeSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const blockRef = useRef(null)

  useGSAP(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const block = blockRef.current
    if (!section || !track || !block) return

    let tween = null
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (!trackRef.current || !blockRef.current) return
        const trackEl = trackRef.current
        const blockEl = blockRef.current
        const singleWidth = blockEl.offsetWidth
        if (singleWidth <= 0) return

        const duration = Math.max(singleWidth / 80, 10)
        tween = gsap.to(trackEl, {
          x: -singleWidth,
          duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % singleWidth),
          },
        })
        observer.disconnect()
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      if (tween) tween.kill()
    }
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="relative z-10 w-full overflow-hidden bg-[#f7f7f5] py-40">
      <div
        ref={trackRef}
        className="flex w-max"
        style={{ willChange: "transform" }}
      >
        <h2
          ref={blockRef}
          className="shrink-0 whitespace-nowrap pb-4 font-family-sans text-[160px] leading-40 tracking-tight text-[#222f30]"
        >
          {MARQUEE_TEXT}
        </h2>
        <h2
          className="shrink-0 whitespace-nowrap pb-4 font-family-sans text-[160px] leading-40 tracking-tight text-[#222f30]"
          aria-hidden
        >
          {MARQUEE_TEXT}
        </h2>
      </div>
    </div>
  )
}