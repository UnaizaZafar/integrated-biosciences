import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText)

const DEFAULTS = {
    duration: 0.7,
    stagger: 0.07,
    ease: "power3.inOut",
}

/**
 * Viewport-triggered masked text reveal: each word is covered by a block
 * (same color as the text); when the heading enters the viewport the blocks
 * drop down to reveal the text.
 *
 * @param {React.RefObject<HTMLElement>} headingRef - Ref to the heading element
 * @param {Object} [options] - Optional overrides for duration, stagger, ease
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

            let tween
            const ctx = gsap.context(() => {
                tween = gsap.to(covers, {
                    y: "100%",
                    duration: opts.duration,
                    ease: opts.ease,
                    stagger: opts.stagger,
                    paused: true,
                })
            }, el)

            const observer = new IntersectionObserver(
                (entries) => {
                    if (!entries[0]?.isIntersecting || !tween) return
                    tween.play()
                    observer.disconnect()
                },
                { root: null, rootMargin: "0px", threshold: 0 }
            )
            observer.observe(el)

            return () => {
                observer.disconnect()
                covers.forEach((cover) => cover?.remove())
                split.revert()
                ctx.revert()
            }
        },
        { dependencies: [headingRef], scope: headingRef }
    )
}
