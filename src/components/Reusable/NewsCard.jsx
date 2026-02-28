import Badge from "./Badge";
import Button from "./Button";

/**
 * @typedef {Object} NewsCardProps
 * @property {string} category - e.g. "Publications"
 * @property {string} date - e.g. "September 4, 2025"
 * @property {string} title
 * @property {string} [description] - optional, only shown on featured variant
 * @property {string} href
 * @property {string} [image] - optional; if provided renders featured (horizontal) layout
 */

/**
 * Reusable NewsCard: Featured (with image) or Compact (no image).
 * Card bg #F5F5F3, border 1px solid rgba(0,0,0,0.06), rounded 20px.
 * Arrow button absolute bottom-4 right-4; heading hover underline; image scale on hover (featured only).
 */
export default function NewsCard({
  category,
  date,
  title,
  description,
  href,
  image,
  bgColor,
}) {
  const isFeatured = Boolean(image);

  const titleSizeClass = isFeatured
    ? "text-[30px] md:text-[36px]"
    : "text-[18px] md:text-[20px] lg:text-[22px]";
  const dateSizeClass = isFeatured ? "text-[15px]" : "text-[12px] md:text-[15px]";
  const readArticleSizeClass = isFeatured ? "text-[13px]" : "text-[11px] md:text-[13px]";

  const contentArea = (
    <div className={`relative flex flex-col justify-between h-full gap-5 ${isFeatured && "py-4 md:py-6" }`}>
      {/* Top row: Badge + date */}
      <div className={`flex flex-wrap items-center justify-between ${isFeatured && "pb-10"} gap-3`}>
        <Badge color={bgColor === "#fff" ? "#222f30" : "white"}>{category}</Badge>
        <time
          dateTime={date}
          className={`font-family-mono uppercase tracking-tight ${bgColor === "#fff" ? "text-[#222f30]/60" : "text-white"} leading-snug ${dateSizeClass}`}
        >
          {typeof date === "string" ? date.toUpperCase() : date}
        </time>
      </div>

      {/* Heading with underline on card hover (group-hover) */}
      <h3>
        <a
          href={href}
          className={`font-family-sans leading-tight tracking-tight ${bgColor === "#fff" ? "text-[#222f30]" : "text-white"} bg-[linear-gradient(currentColor,currentColor)] bg-bottom-left bg-no-repeat bg-size-[0_1.5px] transition-[background-size] duration-400 ease-in-out ${titleSizeClass} group-hover:bg-size-[100%_1.5px]`}
        >
          {title}
        </a>
      </h3>

      {/* Description — only featured */}
      {isFeatured && description && (
        <p className={`font-family-sans text-xl leading-[25px] ${bgColor === "#fff" ? "text-[#222f30]/70" : "text-white/70"}`}>
          {description}
        </p>
      )}

      {/* READ ARTICLE + arrow button row */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
        <p
          className={`font-family-mono uppercase tracking-tight ${bgColor === "#fff" ? "text-[#222f30]" : "text-white"} transition-opacity leading-snug ${readArticleSizeClass}`}
        >
          READ ARTICLE
        </p>
        <Button
          href={href}
          iconOnly
          className="absolute bottom-0 right-0 shrink-0"
          aria-label="Read article"
        />
      </div>
    </div>
  );

  if (isFeatured) {
    return (
      <article className={`group relative overflow-visible rounded-[20px] border border-black/6 bg-white transition-shadow duration-400 ease-in-out px-6 py-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
         
            <div className="h-full w-full overflow-hidden rounded-[16px] ">
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover aspect-sqaure transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
         
          <div className="min-w-0">{contentArea}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative h-full max-h-[300px] overflow-hidden rounded-[20px] border border-black/6 px-8 py-6 transition-shadow duration-400 ease-in-out hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      style={{ backgroundColor: bgColor ?? "#F5F5F3" }}
    >
      {contentArea}
    </article>
  );
}
