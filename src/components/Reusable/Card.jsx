import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

/**
 * Card component matching the design:
 * - Configurable background color and icon via props
 * - Top row: icon (left), step number (right)
 * - Bottom: title and description
 * - icon: React node or string (SVG URL from import)
 * - backgroundColor: hex/rgb string or token name (e.g. "accent", "neutral-light")
 * - Scroll-triggered: card reveals left-to-right (clipPath), then content fades in upward.
 */
function isLiteralColor(value) {
    if (typeof value !== "string") return false
    return (
        value.startsWith("#") ||
        value.startsWith("rgb") ||
        value.startsWith("hsl")
    )
}

function resolveBackgroundColor(value) {
    if (!value) return undefined
    return isLiteralColor(value) ? value : `var(--color-${value})`
}

export default function Card({
    backgroundColor = "#e8f5e9",
    textColor = "#222f30",
    icon,
    number,
    title,
    description,
    children,
    className = "",
}) {
    const cardRef = useRef(null)
    const contentRef = useRef(null)
    const bg = resolveBackgroundColor(backgroundColor)
    const textStyle = textColor ? { color: textColor } : undefined

    useGSAP(
        () => {
            if (!cardRef.current || !contentRef.current) return
            gsap.set(cardRef.current, { clipPath: "inset(0% 100% 0% 0%)" })
            gsap.set(contentRef.current, { opacity: 0, y: 24 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })

            tl.to(cardRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power3.inOut",
            }).to(
                contentRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.4"
            )
        },
        { scope: cardRef }
    )

    return (
        <div
            ref={cardRef}
            className={`flex flex-col gap-8 lg:gap-[130px] p-10 ${className}`}
            style={{ backgroundColor: bg }}
        >
            <div ref={contentRef} className="flex flex-col gap-8 lg:gap-[130px]">
                {/* Top row: icon (left), step number (right) */}
                <div className="flex items-start justify-between gap-4">
                    {icon != null && (
                        <div className="shrink-0 w-[114px] h-[114px] flex items-center justify-center [&_svg]:w-[114px] [&_svg]:h-[114px] [&_img]:w-[114px] [&_img]:h-[114px]">
                            {typeof icon === "string" ? (
                                <img
                                    src={icon}
                                    alt=""
                                    width={114}
                                    height={114}
                                    className="object-contain"
                                />
                            ) : (
                                icon
                            )}
                        </div>
                    )}
                    {number != null && (
                        <span className="text-sm tabular-nums" style={textStyle}>
                            {String(number).padStart(2, "0")}.
                        </span>
                    )}
                </div>

                {/* Content: title + description or children */}
                <div className="flex flex-col gap-4 min-h-0 font-family-sans">
                    {title && (
                        <h3 className="text-[28px] leading-[30px]" style={textStyle}>
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-[19px] leading-[26px]" style={textStyle}>
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}
