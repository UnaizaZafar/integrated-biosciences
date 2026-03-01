import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import Badge from "../Reusable/Badge"

gsap.registerPlugin(ScrollTrigger, SplitText)

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



const FADED_COLOR = "rgba(255, 255, 255, 0.35)"
const FULL_COLOR = "#fff"
const NUM_STAGES = 3

export default function WhatWeDo() {
    const sectionRef = useRef(null)
    const progressBarRef = useRef(null)
    const textContainerRef = useRef(null)
    const stageRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(1)
    useGSAP(
        () => {
            if (
                !sectionRef.current ||
                !progressBarRef.current ||
                !textContainerRef.current
            )
                return

            const section = sectionRef.current
            const progressBar = progressBarRef.current
            const container = textContainerRef.current
            const headings = Array.from(container.children)
            if (headings.length !== NUM_STAGES) return

            const splits = headings.map((el) =>
                SplitText.create(el, {
                    type: "words",
                    wordsClass: "what-we-do-word",
                    tag:"span"
                })
            )

            const ctx = gsap.context(() => {
                const getStageIndex = (p) =>
                    Math.min(NUM_STAGES - 1, Math.floor(p * NUM_STAGES))
                const getStageProgress = (p) => {
                    const stage = getStageIndex(p)
                    const stageStart = stage / NUM_STAGES
                    const stageEnd = (stage + 1) / NUM_STAGES
                    return Math.max(0, Math.min(1, (p - stageStart) / (stageEnd - stageStart)))
                }

                splits.forEach((split) => {
                    gsap.set(split.words, { color: FADED_COLOR })
                })

                const tweens = splits.map((split) =>
                    gsap.to(split.words, {
                        color: FULL_COLOR,
                        stagger: 0.08,
                        duration: 1,
                        paused: true,
                        ease: "none",
                    })
                )

                headings.forEach((h, i) => {
                    gsap.set(h, { opacity: i === 0 ? 1 : 0 })
                })
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                    scroller: window,
                    onUpdate: (self) => {
                        const p = self.progress
                        progressBar.style.transform = `scaleX(${p})`
                        const stage = getStageIndex(p)
                        const stageP = getStageProgress(p)

                        if (stageRef.current !== stage) {
                            stageRef.current = stage
                            setActiveIndex(stage + 1)
                        }

                        headings.forEach((h, i) => {
                            gsap.set(h, { opacity: i === stage ? 1 : 0 })
                        })
                        tweens.forEach((t, i) => {
                            if (i < stage) t.progress(1)
                            else if (i === stage) t.progress(stageP)
                            else t.progress(0)
                        })
                    },
                })

                requestAnimationFrame(() => ScrollTrigger.refresh())
            }, sectionRef)

            return () => {
                ctx.revert()
                splits.forEach((s) => s.revert())
            }
        },
        { scope: sectionRef }
    )

    return (
        <section ref={sectionRef} className="relative">
            <div className="flex h-screen flex-col gap-11 px-12 py-40.5">
                <Badge>What we Do</Badge>

                {/* Progress bar — fills with scroll through section */}
                <div
                    ref={progressBarRef}
                    className="h-0.5 w-full origin-left bg-white/70"
                    style={{ willChange: "transform", transform: "scaleX(0)" }}
                    aria-hidden
                />

                <div className="flex max-lg:flex-col min-h-0 flex-1 justify-between gap-8">
                    <div className="font-family-mono h-max w-max shrink-0 rounded-full border border-white/90 px-5 py-3 text-sm uppercase tracking-tight text-white">
                        {activeIndex.toString().padStart(2, "0")} /{" "}
                        {totalItems.toString().padStart(2, "0")}
                    </div>

                    <div
                        ref={textContainerRef}
                        className="relative max-lg:w-full lg:w-[65%] min-h-[200px] h-[65vh] flex items-start"
                    >
                        {WhatWeDoData.map((item) => (
                            <h1
                                key={item.id}
                                className="font-family-sans text-[40px] lg:text-[58px] leading-[1.2] tracking-tight absolute inset-0 flex flex-wrap content-start items-start whitespace-normal"
                            >
                                {item.description}
                            </h1>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}