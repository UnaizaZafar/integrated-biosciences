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
    const tweenRef = useRef(null)
    const splitsRef = useRef([])
    const textTimelinesRef = useRef([])
    const [activeIndex, setActiveIndex] = useState(1)
    const [spacerHeight, setSpacerHeight] = useState(0)

    // Measure container and set spacer height so scroll distance = horizontal travel
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const setHeight = () => {
            const scrollDistance = container.offsetWidth * (totalItems - 1) * 3
            setSpacerHeight(window.innerHeight + scrollDistance)
        }

        setHeight()
        const ro = new ResizeObserver(setHeight)
        ro.observe(container)
        return () => ro.disconnect()
    }, [])

    // Single effect: horizontal tween + SplitText + per-panel timelines + scroll/IO
    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        const progressBar = progressBarRef.current
        const spacer = spacerRef.current
        if (!section || !container || !progressBar || !spacer) return

        const panels = gsap.utils.toArray(".panel", section)
        if (panels.length === 0) return

        // 1) Horizontal panels tween
        tweenRef.current = gsap.to(innerRef.current, {
            x: () => -(containerRef.current.offsetWidth * (totalItems - 1)),
            ease: "none",
            duration: 1,
            paused: true,
        })

        // 2) SplitText per panel + per-panel paused timelines
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
            if (i < totalItems - 1) {
                tl.to(heading, {
                    y: -24,
                    opacity: 0,
                    duration: 0.25,
                    ease: "none",
                }, 0.75)
            }

            textTimelines.push(tl)
        })

        splitsRef.current = splits
        textTimelinesRef.current = textTimelines

        const tween = tweenRef.current
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
                tween.progress(1)
                progressBar.style.transform = "scaleX(1)"
                setActiveIndex(totalItems)
                textTimelines.forEach((tl) => tl.progress(1))
                ticking = false
                return
            }

            const raw = (scrollY - spacerTop) / scrollDistance
            const progress = Math.max(0, Math.min(1, raw))

            tween.progress(progress)
            progressBar.style.transform = `scaleX(${progress})`
            setActiveIndex(
                Math.min(Math.floor(progress * totalItems) + 1, totalItems)
            )

            textTimelines.forEach((tl, i) => {
                if (progress < (i + 1) / totalItems && progress >= i / totalItems) {
                    tl.progress(getPanelProgress(progress, i))
                } else if (progress < i / totalItems) {
                    tl.progress(0)
                } else {
                    tl.progress(1)
                }
            })

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
                        tween.progress(0)
                        progressBar.style.transform = "scaleX(0)"
                        setActiveIndex(1)
                        textTimelines.forEach((tl) => tl.progress(0))
                    } else if (raw > 1) {
                        tween.progress(1)
                        progressBar.style.transform = "scaleX(1)"
                        setActiveIndex(totalItems)
                        textTimelines.forEach((tl) => tl.progress(1))
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
            tweenRef.current?.kill()
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
                        <div ref={innerRef} className="flex h-full w-[300%]">
                            {WhatWeDoData.map((item) => (
                                <div
                                    key={item.id}
                                    className="panel flex flex-[0_0_33.333%] items-start"
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