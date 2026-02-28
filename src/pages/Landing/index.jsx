import Layout from "../../components/Layout/Layout"
import Hero from "../../components/Home/Hero"
import WhatWeDo from "../../components/Home/WhatWeDo"
import heroVideo from "../../assets/integrated-loop-optimized.mp4"
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport"

const SCROLL_THRESHOLD_VH = 10

export default function Landing() {
  const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH)

  return (
    <Layout>
      {/* Parallax: fixed video stays in place while Hero + WhatWeDo content scroll over it */}
      <div className="relative">
        <div
          className={`fixed inset-0 z-0 overflow-hidden transition-[margin,border-radius] duration-500 ease-in-out ${scrolledPast10vh ? 'm-0 rounded-none' : 'm-3 rounded-xl'}`}
          aria-hidden
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10">
          <Hero />
          <WhatWeDo />
        </div>
      </div>
    </Layout>
  )
}