import Button from "../Reusable/Button";
import NewsCard from "../Reusable/NewsCard";
import { useMaskedTextReveal } from "../../hooks/useMaskedTextReveal";
import { useRef } from "react";
const FEATURED_EXAMPLE = {
  category: "Publications",
  date: "September 4, 2025",
  title: "Optogenetics-enabled discovery of integrated stress response modulators",
  bgColor: "#fff",
  description:
    "In this landmark Cell publication, we unveil our first-of-a-kind optogenetic screening platform, which unlocks a novel mode of drug discovery by enabling tunable, millisecond- and micron-level control over previously intractable biological systems.",
  href: "#",
  image: "/images/news-image.png",
};

const COMPACT_EXAMPLE = [{
  category: "Publications",
  date: "February 20, 2026",
  bgColor: "#fff",
  title:
    "FATE-MAP predicts teratogenicity and human gastrulation failure modes by integrating deep learning and mechanistic modeling",
  href: "#",
},

{
  category: "News",
  date: "February 20, 2026",
  bgColor: "#445E5F",
  title:
    "Integrated Biosciences Appoints Tony Wu, Co-Founder of xAI, to its Scientific Advisory Board",
  href: "#",
},
{
  category: "News",
  date: "February 20, 2026",
  bgColor: "#222F30",
  title:
    "Integrated Biosciences Appoints Daniel J. Anderson, Ph.D. as Chief Scientific Officer",
  href: "#",
},
];
export default function NewsRoom() {
  const headingRef = useRef(null)
  useMaskedTextReveal(headingRef)
  return (
    <section
      className="
        relative
        bg-[#eeeeee]
        rounded-[32px]
        sm:rounded-[40px]
        "
      style={{
        zIndex: 30,
        borderBottomLeftRadius: "32px",
        borderBottomRightRadius: "32px",
        paddingBottom: "48px",
        // Responsive adjustment via media queries in CSS-in-JS, for sharp corners
      }}
    >
      <div className="
        mx-auto
        max-w-[95vw]
        sm:max-w-[1024px]
        lg:max-w-[1400px]
        xl:max-w-[1620px]
        px-4
        py-10
        sm:px-8
        sm:py-16
        md:px-12
        md:py-24
        lg:py-40
      ">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          <h1 ref={headingRef} className="
            text-[36px] 
            sm:text-[48px] 
            md:text-[56px] 
            lg:text-[72px] 
            xl:text-[90px] 
            font-family-sans leading-tight tracking-tight text-[#222f30]
          ">
            Newsroom
          </h1>
          <div className="mt-2 w-full sm:w-auto flex-shrink-0">
            <Button href="/newsroom" className="w-full sm:w-auto text-[16px] sm:text-[18px]">
              View all Articles
            </Button>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8">
          <NewsCard {...FEATURED_EXAMPLE} />
          <div className="
            grid 
            grid-cols-1 
            gap-6 
            sm:gap-8 
            md:grid-cols-2 
            lg:grid-cols-3
          ">
            {COMPACT_EXAMPLE.map((item) => (
              <NewsCard key={item.title} className={item.className} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}