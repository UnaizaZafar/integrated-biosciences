import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Badge from "../Reusable/Badge"

gsap.registerPlugin(ScrollTrigger)

const WhatWeDoData = [
    {
        id: 1,
        description:
            "Aging is an intrinsically complex systems biology challenge. Our Integrated Platform is purpose-built to unravel its intricate networks.",
    },
    {
        id: 2,
        description:
            "By combining synthetic biology, chemistry, and AI, we probe disease biology with unprecedented control and precision, enabling a systematic exploration of chemical space that was previously inaccessible.",
    },
    {
        id: 3,
        description:
            "Through the convergence of high-fidelity biological and chemical data with advanced Al, we unlock new therapeutic opportunities for age-related diseases.",
    },
]

const totalItems = WhatWeDoData.length

/**
 * Splits text into individual word <span data-word> elements.
 * Each word starts invisible (opacity:0, y:24) via inline style —
 * guaranteed hidden from first paint, before GSAP ever runs.
 * Color is dim white (rgba(255,255,255,0.4)) so words appear
 * subdued when they stagger in; the fill overlay brightens them.
 */
function WordSplit({ text }) {
    const words = text.split(" ")
    return (
        <>
            {words.map((word, i) => (
                <span
                    key={i}
                    data-word
                    className="inline-block"
                    style={{
                        opacity: 0,
                        transform: "translateY(24px)",
                        color: "rgba(255, 255, 255, 0.45)",
                    }}
                >
                    {word}
                    {i < words.length - 1 ? "\u00a0" : ""}
                </span>
            ))}
        </>
    )
}

export default function WhatWeDo() {
    const sectionRef = useRef(null)
    const progressBarRef = useRef(null)
    const headingRefs = useRef([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        const progressBar = progressBarRef.current
        const headings = headingRefs.current.filter(Boolean)

        if (!section || !progressBar || headings.length !== totalItems) return

        const SEG = 1 / totalItems   // 0.333…
        const WORD_IN_PORTION = 0.32             // 32% of each segment for word stagger
        const FADE_OUT_PORTION = 0.08             // last 8% of each segment for exit

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate(self) {
                    const p = self.progress
                    setActiveIndex(
                        Math.min(totalItems - 1, Math.floor(p * totalItems))
                    )
                },
            },
        })

        // Progress bar
        tl.fromTo(
            progressBar,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "none" },
            0
        )

        headings.forEach((el, i) => {
            const segStart = i * SEG
            const segEnd = (i + 1) * SEG
            const fadeOutStart = segEnd - FADE_OUT_PORTION * SEG

            // All [data-word] inside this heading
            const words = Array.from(el.querySelectorAll("[data-word]"))
            const wordDur = (WORD_IN_PORTION * SEG) / Math.max(words.length, 1)

            // ── Word stagger in ──────────────────────────────────────────
            // Each word gets its own tween placed sequentially in the scrub
            // timeline → natural scroll-driven stagger effect.
            words.forEach((word, wi) => {
                tl.fromTo(
                    word,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: wordDur, ease: "none" },
                    segStart + wi * wordDur
                )
            })

            // ── Fill text (GSAP tween: scroll down → fills, scroll up → unfills) ──────
            tl.to(el, { "--fill": "100%", duration: SEG, ease: "none" }, segStart)

            // ── Fade out + slide up (every segment except the last) ──────
            if (i < totalItems - 1) {
                // Fade out the whole heading block (words + fill overlay together)
                tl.fromTo(
                    el,
                    { opacity: 1, y: 0 },
                    { opacity: 0, y: -28, duration: FADE_OUT_PORTION * SEG, ease: "none" },
                    fadeOutStart
                )
            }
        })

        return () => {
            const st = tl.scrollTrigger
            if (st) st.kill()
            tl.kill()
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative flex h-screen flex-col gap-11 bg-none px-12 py-40.5"
        >
            <Badge>What we Do</Badge>

            {/* Progress bar */}
            <div
                ref={progressBarRef}
                className="h-0.5 w-full origin-left bg-white/70"
                style={{ willChange: "transform", transform: "scaleX(0)" }}
                aria-hidden
            />

            <div className="flex min-h-0 justify-between gap-8">
                {/* Counter pill */}
                <div className="font-family-mono h-max w-max shrink-0 rounded-full border border-white/90 px-5 py-3 text-sm uppercase tracking-tight text-white">
                    {(activeIndex + 1).toString().padStart(2, "0")} /{" "}
                    {totalItems.toString().padStart(2, "0")}
                </div>

                {/* Headings stack — single text layer; fill via .fill-text gradient + --fill */}
                <div className="relative w-[65%] min-h-[180px]">
                    {WhatWeDoData.map((item, i) => (
                        <h1
                            key={item.id}
                            ref={(el) => (headingRefs.current[i] = el)}
                            style={{
                                "--fill": "0%",
                                position: i === 0 ? "relative" : "absolute",
                                ...(i > 0 && { inset: 0 }),
                                color: "transparent",  
                            }}
                            className="fill-text font-family-sans text-[58px] leading-16 tracking-tight"
                        >
                            <WordSplit text={item.description} />
                        </h1>
                    ))}
                </div>
            </div>
        </section>
    )
}