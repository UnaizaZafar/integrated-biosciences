/**
 * Reusable badge: pill/chip with optional leading icon.
 * Matches design: white bg, softly rounded corners, light green square icon with dot, uppercase text.
 * Uses project theme: primary (#A7E26E), accent (#CEF79E).
 */

const DEFAULT_ICON = (
  <span
    className="flex h-2.5 w-2.5 shrink-0 items-center justify-center bg-[#a7e26e]"
    aria-hidden
  >
  </span>
);

export default function Badge({
  children,
  className = "",
  icon = DEFAULT_ICON,
  color = "white",
  ...props
}) {
  const showIcon = icon !== null && icon !== undefined;
  return (
    <span
      className={
        [
          `rounded-[8px] w-max inline-flex items-center gap-3 bg-[#ffffff1a] pr-3 p-2 font-family-mono text-sm uppercase tracking-tight leading-3.5 text-[${color}]`,
          color === "white" ? "bg-[#ffffff1a]" : "bg-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
      {...props}
    >
      {showIcon ? icon : null}
      <span>{children}</span>
    </span>
  );
}
