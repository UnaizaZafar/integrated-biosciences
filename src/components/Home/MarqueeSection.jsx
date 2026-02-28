import { useEffect, useRef } from "react"

const MARQUEE_TEXT = "Rewriting the biology of aging – "

export default function MarqueeSection() {
  const trackRef = useRef(null)
  const blockRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const block = blockRef.current
    if (!track || !block) return

    const width = block.offsetWidth
    const durationSec = width / 80
    track.style.animation = `marquee ${durationSec}s linear infinite`
  }, [])

  return (
    <div className="marquee-wrap relative z-10 w-full overflow-hidden bg-[#f7f7f5] py-40">
      <div
        ref={trackRef}
        className="marquee-track flex w-max"
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
