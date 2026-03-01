import { useRef, useLayoutEffect } from "react";

import { gsap } from "gsap";
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

const HEIGHT = 48;

export default function Button({
  children,
  className = "",
  onClick,
  href,
  iconOnly = false,
  ...props
}) {
  const wrapperRef        = useRef(null);
  const pillInnerRef      = useRef(null);
  const labelCornerRef    = useRef(null);
  const arrowShapeRef     = useRef(null);
  const textRef           = useRef(null);
  const arrowIconLayer1Ref = useRef(null);
  const arrowIconLayer2Ref = useRef(null);

  useLayoutEffect(() => {
    const wrapper       = wrapperRef.current;
    const pillInner     = pillInnerRef.current;
    const labelCorner   = labelCornerRef.current;
    const arrowShape    = arrowShapeRef.current;
    const textEl        = textRef.current;
    const arrowL1       = arrowIconLayer1Ref.current;
    const arrowL2       = arrowIconLayer2Ref.current;
    if (!wrapper || !arrowShape) return;
    if (!arrowL1 || !arrowL2) return;
    if (!iconOnly && (!pillInner || !textEl)) return;

    // Arrow icon slide: left-to-right (L2 starts left, slides in to center)
    gsap.set(arrowL1, { xPercent: 0, yPercent: 0 });
    gsap.set(arrowL2, { xPercent: -100, yPercent: 0 });

    const toHover = () => {
      if (!iconOnly) {
        gsap.to(pillInner, {
          backgroundColor: COLORS.pillBgHover,
          duration: 0.4,
          ease: "power2.inOut",
        });
        if (labelCorner) {
          gsap.to(labelCorner, { attr: { fill: COLORS.pillBgHover }, duration: 0.4, ease: "power2.inOut" });
        }
        gsap.to(textEl, {
          color: COLORS.textDark,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      gsap.to(arrowShape, { attr: { fill: COLORS.pillBg }, duration: 0.4, ease: "power2.inOut" });
      // Arrow icon: slide left to right (L1 exits right, L2 enters from left)
      gsap.timeline()
        .to(arrowL1, { xPercent: 100, duration: 0.4, ease: "power2.inOut" }, "<")
        .to(arrowL2, { xPercent: 0, duration: 0.4, ease: "power2.inOut" }, "<");
    };

    const toDefault = () => {
      if (!iconOnly) {
        gsap.to(pillInner, {
          backgroundColor: COLORS.pillBg,
          duration: 0.4,
          ease: "power2.inOut",
        });
        if (labelCorner) {
          gsap.to(labelCorner, { attr: { fill: COLORS.pillBg }, duration: 0.4, ease: "power2.inOut" });
        }
        gsap.to(textEl, {
          color: COLORS.textLight,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      gsap.to(arrowShape, { attr: { fill: COLORS.arrowBg }, duration: 0.4, ease: "power2.inOut" });
      // Arrow icon: slide back (L2 exits left, L1 returns from right)
      gsap.timeline()
        .to(arrowL1, { xPercent: 0, duration: 0.4, ease: "power2.inOut" }, "<")
        .to(arrowL2, { xPercent: -100, duration: 0.4, ease: "power2.inOut" }, "<");
    };

    wrapper.addEventListener("mouseenter", toHover);
    wrapper.addEventListener("mouseleave", toDefault);

    return () => {
      wrapper.removeEventListener("mouseenter", toHover);
      wrapper.removeEventListener("mouseleave", toDefault);
      const targets = [arrowShape, arrowL1, arrowL2];
      if (!iconOnly) targets.push(pillInner, textEl);
      if (labelCorner) targets.push(labelCorner);
      gsap.killTweensOf(targets);
    };
  }, [iconOnly]);

  // Corner strip width: diagonal slant between label and icon
  const LABEL_CORNER_WIDTH = 18;

  // ─── Pill (btn_label) — rounded left + slanted right (diagonal) ────────────
  const pill = (
    <span
      className="btn_label relative flex items-center overflow-hidden rounded-l-[14px]"
      style={{ height: HEIGHT, minWidth: 140, paddingLeft: 22, paddingRight: 0 }}
    >
      {/* Background fill — rounded left, ends before corner strip so diagonal shows */}
      <span
        ref={pillInnerRef}
        className="absolute left-0 top-0 bottom-0 rounded-l-[14px]"
        style={{
          right: LABEL_CORNER_WIDTH,
          backgroundColor: COLORS.pillBg,
        }}
        aria-hidden
      />
      {/* Text */}
      <span
        ref={textRef}
        className="relative z-10 font-mono uppercase tracking-tight text-sm whitespace-nowrap pr-2"
        style={{ color: COLORS.textLight }}
      >
        {children}
      </span>
      {/* Label corner — curved transition to icon (matches arrow button style) */}
      <span className="label_corner relative z-10 flex items-stretch shrink-0" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" width={LABEL_CORNER_WIDTH} height={48} fill="none" viewBox="0 0 18 48">
          <path
            ref={labelCornerRef}
            fill={COLORS.pillBg}
            d="M0 0 C1.87 0 3.75 0 5.63 0 13.43 0 19.16 7.33 17.27 14.91 15.24 23.02 13.21 31.14 11.18 39.26 9.89 44.4 5.28 47.99 0 48 0 32 0 16 0 0"
          />
        </svg>
      </span>
    </span>
  );

  // Arrow icon SVG (shared by both layers; pass stroke for reliable visibility)
  const ArrowIconSvg = ({ className = "", style = {}, stroke = "currentColor", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );

  // ─── Arrow (btn_icon) — rounded shape SVG + sliding arrow (ScrollToTop-style) ─
  const arrowBtn = (
    <span
      className="btn_icon relative flex items-center justify-center shrink-0"
      style={{ width: 51, height: HEIGHT }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={51}
        height={48}
        fill="none"
        viewBox="0 0 51 48"
        className="absolute inset-0 h-full w-full"
      >
        <path
          ref={arrowShapeRef}
          fill={COLORS.arrowBg}
          d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"
        />
      </svg>
      <span className="relative z-10 h-full w-full overflow-hidden" aria-hidden>
        <div
          ref={arrowIconLayer1Ref}
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: COLORS.arrowDark }}
        >
          <ArrowIconSvg />
        </div>
        <div
          ref={arrowIconLayer2Ref}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <ArrowIconSvg stroke="white" />
        </div>
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

  const content = iconOnly ? (
    arrowBtn
  ) : (
    <>
      {pill}
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