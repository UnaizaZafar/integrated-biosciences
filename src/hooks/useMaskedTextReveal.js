import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText)

const DEFAULTS = {
    start: "top 80%",
    duration: 0.7,
    stagger: 0.07,
    ease: "power3.inOut",
}

/**
 * Scroll-triggered masked text reveal: each word is covered by a block
 * (same color as the text); on scroll enter the blocks drop down to reveal the text.
 *
 * @param {React.RefObject<HTMLElement>} headingRef - Ref to the heading element
 * @param {Object} [options] - Optional overrides for start, duration, stagger, ease
 */
export function useMaskedTextReveal(headingRef, options = {}) {
    const opts = { ...DEFAULTS, ...options }

    useGSAP(
        () => {
            if (!headingRef.current) return

            const el = headingRef.current
            const split = SplitText.create(el, { type: "words" })

            split.words.forEach((word) => {
                gsap.set(word, {
                    overflow: "hidden",
                    display: "inline-block",
                    position: "relative",
                })

                const cover = document.createElement("span")
                const textColor =
                    typeof window !== "undefined"
                        ? getComputedStyle(word).color
                        : "currentColor"

                gsap.set(cover, {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "110%",
                    backgroundColor: textColor,
                    zIndex: 2,
                    y: "0%",
                })
                word.appendChild(cover)
            })

            const covers = split.words.map((word) =>
                word.querySelector("span:last-child")
            ).filter(Boolean)

            const ctx = gsap.context(() => {
                gsap.to(covers, {
                    y: "100%",
                    duration: opts.duration,
                    ease: opts.ease,
                    stagger: opts.stagger,
                    scrollTrigger: {
                        trigger: el,
                        start: opts.start,
                        toggleActions: "play none none none",
                        invalidateOnRefresh: true
                    },
                })
            }, el)
// Recalculate positions after layout/fonts settle
const rafId = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
  
            return () => {
                cancelAnimationFrame(rafId)
                covers.forEach((cover) => cover?.remove())
                split.revert()
                ctx.revert()
            }
        },
        { dependencies: [headingRef], scope: headingRef }
    )
}
