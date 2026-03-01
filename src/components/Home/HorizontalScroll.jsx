import React, { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import Badge from "../Reusable/Badge"

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
    const progressBarRef = useRef(null)
    const tweenRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(1)
    const [spacerHeight, setSpacerHeight] = useState(0)

    // Measure container and set spacer height so scroll distance = horizontal travel
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const setHeight = () => {
            const scrollDistance = container.offsetWidth * (totalItems - 1)
            setSpacerHeight(window.innerHeight + scrollDistance)
        }

        setHeight()
        const ro = new ResizeObserver(setHeight)
        ro.observe(container)
        return () => ro.disconnect()
    }, [])

    // GSAP tween for horizontal panels (progress driven by scroll)
    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        const progressBar = progressBarRef.current
        if (!section || !container || !progressBar) return

        const panels = gsap.utils.toArray(".panel", section)
        if (panels.length === 0) return

        tweenRef.current = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            duration: 1,
            paused: true,
        })

        return () => {
            tweenRef.current?.kill()
        }
    }, [])

    // IntersectionObserver + scroll: pin section in y, drive tween progress
    useEffect(() => {
        const spacer = spacerRef.current
        const section = sectionRef.current
        const progressBar = progressBarRef.current
        const tween = tweenRef.current
        if (!spacer || !section || !progressBar || !tween) return

        let ticking = false

        const updateProgress = () => {
            const scrollY = window.scrollY ?? document.documentElement.scrollTop
            const spacerTop = spacer.getBoundingClientRect().top + scrollY
            const scrollDistance = spacer.offsetHeight - window.innerHeight

            if (scrollDistance <= 0) {
                tween.progress(1)
                progressBar.style.transform = "scaleX(1)"
                setActiveIndex(totalItems)
                return
            }

            const raw = (scrollY - spacerTop) / scrollDistance
            const progress = Math.max(0, Math.min(1, raw))

            tween.progress(progress)
            progressBar.style.transform = `scaleX(${progress})`
            setActiveIndex(
                Math.min(Math.floor(progress * totalItems) + 1, totalItems)
            )
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
                    const scrollY = window.scrollY ?? document.documentElement.scrollTop
                    const spacerTop = spacer.getBoundingClientRect().top + scrollY
                    const scrollDistance = spacer.offsetHeight - window.innerHeight
                    if (scrollDistance <= 0) return
                    const raw = (scrollY - spacerTop) / scrollDistance
                    if (raw < 0) {
                        tween.progress(0)
                        progressBar.style.transform = "scaleX(0)"
                        setActiveIndex(1)
                    } else if (raw > 1) {
                        tween.progress(1)
                        progressBar.style.transform = "scaleX(1)"
                        setActiveIndex(totalItems)
                    }
                }
            },
            { root: null, rootMargin: "0px", threshold: 0 }
        )

        observer.observe(spacer)

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", onScroll)
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
                        <div className="flex h-full w-[300%]">
                            {WhatWeDoData.map((item) => (
                                <div
                                    key={item.id}
                                    className="panel flex flex-[0_0_33.333%] items-start"
                                >
                                    <h1 className="font-family-sans text-[40px] lg:text-[58px] leading-[1.2] tracking-tight pr-8">
                                        {item.description}
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