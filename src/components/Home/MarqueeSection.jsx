import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const MARQUEE_TEXT = "Rewriting the biology of aging – "

export default function MarqueeSection() {
  const trackRef = useRef(null)
  const blockRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    const block = blockRef.current
    if (!track || !block) return

    const singleWidth = block.offsetWidth
    if (singleWidth <= 0) return

    const duration = Math.max(singleWidth / 80, 10)

    gsap.to(track, {
      x: -singleWidth,       // move exactly one copy width
      duration,
      ease: "none",
      repeat: -1,            // infinite
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % singleWidth) // seamless loop
      }
    })
  }, { scope: trackRef })

  return (
    <div className="relative z-10 w-full overflow-hidden bg-[#f7f7f5] py-40">
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