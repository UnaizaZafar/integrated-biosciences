import React, { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Badge from "../Reusable/Badge"
import { lenisRef } from "../../lenisRef"

gsap.registerPlugin(ScrollTrigger, SplitText)

// Use Lenis scroll when available (set by useLenis), else native scroll
function getScrollY() {
    if (lenisRef.current != null) {
        return lenisRef.current.scroll
    }
    return window.scrollY ?? document.documentElement.scrollTop
}

const FADED_COLOR = "rgba(255, 255, 255, 0.35)"
const FULL_COLOR = "#fff"

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

export default function HorizontalScroll() {
    const spacerRef = useRef(null)
    const sectionRef = useRef(null)
    const containerRef = useRef(null)
    const innerRef = useRef(null)
    const progressBarRef = useRef(null)
    const splitsRef = useRef([])
    const textTimelinesRef = useRef([])
    const [activeIndex, setActiveIndex] = useState(1)
    const [spacerHeight, setSpacerHeight] = useState(0)

    // Spacer height: scroll distance for section (no horizontal travel; one text slot per segment)
    useEffect(() => {
        const setHeight = () => {
            const scrollDistance = window.innerHeight * (totalItems - 1) * 2
            setSpacerHeight(window.innerHeight + scrollDistance)
        }
        setHeight()
        window.addEventListener("resize", setHeight)
        return () => window.removeEventListener("resize", setHeight)
    }, [])

    // SplitText + per-panel timelines + scroll/IO
    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        const progressBar = progressBarRef.current
        const spacer = spacerRef.current
        if (!section || !container || !progressBar || !spacer) return

        const panels = gsap.utils.toArray(".panel", section)
        if (panels.length === 0) return

        // No horizontal slide: one text slot; panels stacked and visibility switched by segment

        // SplitText per panel + per-panel paused timelines
        const splits = []
        const textTimelines = []

        panels.forEach((panel, i) => {
            const textEl = panel.querySelector(".panel-text")
            const heading = panel.querySelector(".panel-heading")
            if (!textEl || !heading) return

            const split = SplitText.create(textEl, {
                type: "words",
                wordsClass: "horizontal-scroll-word",
            })
            splits.push(split)
            gsap.set(split.words, { color: FADED_COLOR })

            // All panels start visible (no initial opacity 0) so desc 1 and 2 show like desc 3

            const tl = gsap.timeline({ paused: true })

            // Same structure for all panels: 0→0.75 word fill, 0.75→1 fade-out only if not last panel
            tl.to(split.words, {
                color: FULL_COLOR,
                stagger: 0.08,
                ease: "none",
                duration: 0.75,
            }, 0)
            // if (i < totalItems - 1) {
            //     tl.to(heading, {
            //         y: -24,
            //         opacity: 0,
            //         duration: 0.25,
            //         ease: "none",
            //     }, 0.75)
            // }

            textTimelines.push(tl)
        })

        splitsRef.current = splits
        textTimelinesRef.current = textTimelines

        let ticking = false

        const getPanelProgress = (progress, panelIndex) => {
            const start = panelIndex / totalItems
            const end = (panelIndex + 1) / totalItems
            return Math.max(0, Math.min(1, (progress - start) / (end - start)))
        }

        const updateProgress = () => {
            const scrollY = getScrollY()
            const spacerTop = spacer.getBoundingClientRect().top + scrollY
            const scrollDistance = spacer.offsetHeight - window.innerHeight

            if (scrollDistance <= 0) {
                // #region agent log
                fetch('http://127.0.0.1:7246/ingest/be37c03b-fa23-448b-aee5-a7b038704c5b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HorizontalScroll.jsx:updateProgress',message:'scrollDistance<=0 branch',data:{scrollDistance,scrollY,spacerTop,spacerHeight:spacer.offsetHeight,innerHeight:window.innerHeight},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                // No scroll room yet (e.g. initial mount): show first panel, not last
                progressBar.style.transform = "scaleX(0)"
                setActiveIndex(1)
                textTimelines.forEach((tl) => tl.progress(0))
                panels.forEach((panel, i) => { panel.style.opacity = i === 0 ? 1 : 0 })
                ticking = false
                return
            }

            const raw = (scrollY - spacerTop) / scrollDistance
            const progress = Math.max(0, Math.min(1, raw))

            progressBar.style.transform = `scaleX(${progress})`
            setActiveIndex(
                Math.min(Math.floor(progress * totalItems) + 1, totalItems)
            )

            // One panel visible at a time (the one in whose segment we are)
            const activePanelIndex = Math.min(Math.floor(progress * totalItems), totalItems - 1)
            panels.forEach((panel, i) => {
                panel.style.opacity = i === activePanelIndex ? 1 : 0
            })

            const panelProgresses = []
            textTimelines.forEach((tl, i) => {
                let setP
                if (progress < (i + 1) / totalItems && progress >= i / totalItems) {
                    setP = getPanelProgress(progress, i)
                    tl.progress(setP)
                } else if (progress < i / totalItems) {
                    setP = 0
                    tl.progress(0)
                } else {
                    setP = 1
                    tl.progress(1)
                }
                panelProgresses.push({ i, setP })
            })

            if (Date.now() - lastLogTs > 400) {
                lastLogTs = Date.now()
                // #region agent log
                fetch('http://127.0.0.1:7246/ingest/be37c03b-fa23-448b-aee5-a7b038704c5b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HorizontalScroll.jsx:updateProgress',message:'progress update',data:{raw,progress,scrollY,spacerTop,scrollDistance,panelProgresses,activeIndex:Math.min(Math.floor(progress*totalItems)+1,totalItems)},hypothesisId:'H2_H4_H5',timestamp:Date.now()})}).catch(()=>{});
                // #endregion
            }

            ticking = false
        }

        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(updateProgress)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    window.addEventListener("scroll", onScroll, { passive: true })
                    updateProgress()
                } else {
                    window.removeEventListener("scroll", onScroll)
                    const scrollY = getScrollY()
                    const spacerTop = spacer.getBoundingClientRect().top + scrollY
                    const scrollDistance = spacer.offsetHeight - window.innerHeight
                    if (scrollDistance <= 0) return
                    const raw = (scrollY - spacerTop) / scrollDistance
                    if (raw < 0) {
                        progressBar.style.transform = "scaleX(0)"
                        setActiveIndex(1)
                        textTimelines.forEach((tl) => tl.progress(0))
                        panels.forEach((panel, i) => { panel.style.opacity = i === 0 ? 1 : 0 })
                    } else if (raw > 1) {
                        progressBar.style.transform = "scaleX(1)"
                        setActiveIndex(totalItems)
                        textTimelines.forEach((tl) => tl.progress(1))
                        panels.forEach((panel, i) => { panel.style.opacity = i === totalItems - 1 ? 1 : 0 })
                    }
                }
            },
            { root: null, rootMargin: "0px", threshold: 0 }
        )

        observer.observe(spacer)
        updateProgress()

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", onScroll)
            textTimelines.forEach((tl) => tl.kill())
            splits.forEach((s) => s.revert())
            splitsRef.current = []
            textTimelinesRef.current = []
        }
    }, [spacerHeight])

    return (
        <div
            ref={spacerRef}
            className="relative"
            style={{ minHeight: spacerHeight > 0 ? spacerHeight : "100vh" }}
        >
            <section
                ref={sectionRef}
                className="sticky top-0 left-0 right-0 z-0 flex h-screen w-full flex-col gap-11 px-12 py-40.5"
            >
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
                        ref={containerRef}
                        className="container overflow-hidden max-lg:w-full lg:w-[65%] min-h-[200px] h-[65vh]"
                    >
                        <div ref={innerRef} className="relative h-full w-full">
                            {WhatWeDoData.map((item) => (
                                <div
                                    key={item.id}
                                    className="panel absolute inset-0 flex items-start transition-opacity duration-300"
                                    style={{ opacity: item.id === 1 ? 1 : 0 }}
                                    aria-hidden={activeIndex !== item.id}
                                >
                                    <h1 className="panel-heading font-family-sans text-[40px] lg:text-[58px] leading-[1.2] tracking-tight pr-8">
                                        <span className="panel-text">{item.description}</span>
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}