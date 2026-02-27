import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

/**
 * Two-part CTA: pill (text) + rounded square (arrow) with a small gap.
 *
 * Shape:
 *  - Outer containers: fully rounded corners (border-radius) + overflow-hidden
 *  - Inner fill spans: clip-path creates the diagonal slant on the shared inner edge
 *
 * Default (Image 1 — dark pill, lime arrow):
 *  - Pill right edge: wider at top  → polygon(0 0, 100% 0, 88% 100%, 0 100%)
 *  - Arrow left edge: wider at bottom → polygon(12% 0, 100% 0, 100% 100%, 0% 100%)
 *
 * Hover (Image 2 — lime pill, dark arrow):
 *  - Pill right edge flips: wider at bottom → polygon(0 0, 88% 0, 100% 100%, 0 100%)
 *  - Arrow left edge flips: wider at top   → polygon(0% 0, 100% 0, 100% 100%, 12% 100%)
 *
 * Arrow icon: slides right on mouseenter, slides left on mouseleave.
 */

const COLORS = {
  pillBg:       "#2F3637",
  arrowBg:      "#B5FF7F",
  pillBgHover:  "#B5FF7F",
  arrowBgHover: "#2F3637",
  textLight:    "#E7E8E1",
  textDark:     "#1A2126",
  arrowDark:    "#1A2126",
  arrowLight:   "#E7E8E1",
};

// Pill — right (inner) edge slant
const PILL_CLIP_DEFAULT = "polygon(0 0, 100% 0, 92% 100%, 0 100%)";
const PILL_CLIP_HOVER   = "polygon(0 0, 92%  0, 100% 100%, 0 100%)";

// Arrow — left (inner) edge slant
const ARROW_CLIP_DEFAULT = "polygon(16% 0, 100% 0, 100% 100%, 0%  100%)";
const ARROW_CLIP_HOVER   = "polygon(0%  0, 100% 0, 100% 100%, 16% 100%)";

const HEIGHT = 48;

export default function Button({
  children,
  className = "",
  onClick,
  href,
  ...props
}) {
  const wrapperRef    = useRef(null);
  const pillInnerRef  = useRef(null);
  const arrowInnerRef = useRef(null);
  const textRef       = useRef(null);
  const arrowIconRef  = useRef(null);

  useLayoutEffect(() => {
    const wrapper    = wrapperRef.current;
    const pillInner  = pillInnerRef.current;
    const arrowInner = arrowInnerRef.current;
    const textEl     = textRef.current;
    const arrowIcon  = arrowIconRef.current;
    if (!wrapper || !pillInner || !arrowInner || !textEl || !arrowIcon) return;

    const toHover = () => {
      gsap.to(pillInner, {
        backgroundColor: COLORS.pillBgHover,
        clipPath: PILL_CLIP_HOVER,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(arrowInner, {
        backgroundColor: COLORS.arrowBgHover,
        clipPath: ARROW_CLIP_HOVER,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(textEl, {
        color: COLORS.textDark,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(arrowIcon, {
        color: COLORS.arrowLight,
        duration: 0.3,
        ease: "power2.out",
      });
      // Arrow slides right then bounces back
      gsap.killTweensOf(arrowIcon, "x");
      gsap.fromTo(
        arrowIcon,
        { x: 0 },
        { x: 7, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    };

    const toDefault = () => {
      gsap.to(pillInner, {
        backgroundColor: COLORS.pillBg,
        clipPath: PILL_CLIP_DEFAULT,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(arrowInner, {
        backgroundColor: COLORS.arrowBg,
        clipPath: ARROW_CLIP_DEFAULT,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(textEl, {
        color: COLORS.textLight,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(arrowIcon, {
        color: COLORS.arrowDark,
        duration: 0.3,
        ease: "power2.out",
      });
      // Arrow slides left then bounces back
      gsap.killTweensOf(arrowIcon, "x");
      gsap.fromTo(
        arrowIcon,
        { x: 0 },
        { x: -7, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    };

    wrapper.addEventListener("mouseenter", toHover);
    wrapper.addEventListener("mouseleave", toDefault);

    return () => {
      wrapper.removeEventListener("mouseenter", toHover);
      wrapper.removeEventListener("mouseleave", toDefault);
      gsap.killTweensOf([pillInner, arrowInner, textEl, arrowIcon]);
    };
  }, []);

  // ─── Pill ────────────────────────────────────────────────────────────────
  const pill = (
    <span
      className="relative flex items-center overflow-hidden rounded-[14px]"
      style={{ height: HEIGHT, minWidth: 140, paddingLeft: 22, paddingRight: 28 }}
    >
      {/* Clipped background fill */}
      <span
        ref={pillInnerRef}
        className="absolute inset-0"
        style={{
          backgroundColor: COLORS.pillBg,
          clipPath: PILL_CLIP_DEFAULT,
        }}
        aria-hidden
      />
      {/* Text */}
      <span
        ref={textRef}
        className="relative z-10 font-mono uppercase tracking-tight text-sm whitespace-nowrap"
        style={{ color: COLORS.textLight }}
      >
        {children}
      </span>
    </span>
  );

  // ─── Arrow square ─────────────────────────────────────────────────────────
  const arrowBtn = (
    <span
      className="relative flex items-center justify-center overflow-hidden rounded-[14px] shrink-0"
      style={{ width: HEIGHT, height: HEIGHT }}
    >
      {/* Clipped background fill */}
      <span
        ref={arrowInnerRef}
        className="absolute inset-0"
        style={{
          backgroundColor: COLORS.arrowBg,
          clipPath: ARROW_CLIP_DEFAULT,
        }}
        aria-hidden
      />
      {/* Arrow icon */}
      <span
        ref={arrowIconRef}
        className="relative z-10 text-base leading-none select-none"
        style={{ color: COLORS.arrowDark, display: "inline-block" }}
        aria-hidden
      >
        →
      </span>
    </span>
  );

  // ─── Wrapper ──────────────────────────────────────────────────────────────
  const combinedClassName = [
    "inline-flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF7F] focus-visible:ring-offset-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {pill}
      {/* Small visual gap between sections */}
      <span className="shrink-0" style={{ width: 1 }} aria-hidden />
      {arrowBtn}
    </>
  );

  const commonProps = {
    ref: wrapperRef,
    className: combinedClassName,
    onClick,
    ...props,
  };

  if (href) {
    return <a href={href} {...commonProps}>{content}</a>;
  }

  return (
    <button type="button" {...commonProps}>
      {content}
    </button>
  );
}