import Button from "../Reusable/Button";
import NewsCard from "../Reusable/NewsCard";

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
  return (
    <div className="relative z-10 w-full rounded-[40px] bg-[#eeeeee]">
      <div className="mx-auto max-w-[1620px] px-6 py-16 md:px-12 md:py-24 lg:py-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h1 className="text-[56px] font-family-sans leading-tight tracking-tight text-[#222f30] md:text-[90px]">
            Newsroom
          </h1>
          <Button href="/newsroom">View all Articles</Button>
        </div>
        <div className="mt-12 flex flex-col gap-8">
          <NewsCard {...FEATURED_EXAMPLE} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {COMPACT_EXAMPLE.map((item) => (
              <NewsCard key={item.title} className={item.className} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}