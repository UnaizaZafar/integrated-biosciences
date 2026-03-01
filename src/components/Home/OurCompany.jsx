import Badge from "../Reusable/Badge";
import Button from "../Reusable/Button";
import { useMaskedTextReveal } from "../../hooks/useMaskedTextReveal";
import { useRef } from "react";
export default function OurCompany() {
  const headingRef = useRef(null)
  useMaskedTextReveal(headingRef)
  return (
    <section className="relative z-10 w-full bg-[#f7f7f5] pb-12 sm:pb-16 md:pb-24 lg:pb-40 transition-all duration-300">
      <div className="mx-auto flex max-w-[95vw] sm:max-w-[1024px] lg:max-w-[1400px] xl:max-w-[1620px] flex-col gap-8 sm:gap-10 md:gap-13 rounded-t-2xl border-t border-[#222f301a] pt-6 sm:pt-8 md:pt-12 transition-all">
        <span className="block px-4 pb-6 sm:px-8 sm:pb-10 lg:px-12 lg:pb-13">
          <Badge color="#222f30">Our Company</Badge>
        </span>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 md:gap-12 md:px-8 md:pb-10 lg:gap-16 lg:px-12 lg:pb-12 px-4 pb-6">
          {/* Left: image with rounded corners */}
          <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl h-56 sm:h-72 md:h-auto transition-all">
            <img
              src="/images/Integrated_Biosciences-scaled.jpg"
              alt="Scientists in a laboratory collaborating on research"
              className="h-full w-full object-cover aspect-video md:aspect-auto"
              loading="lazy"
            />
          </div>

          {/* Right: headline, body copy (2 columns on md+), CTAs */}
          <div className="flex flex-col justify-center gap-5 sm:gap-6 md:gap-8 transition-all">
            <h2 ref={headingRef} className="font-family-sans text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2] tracking-tight text-[#222f30]">
              Bold research to unlock small molecule discovery for human health and aging.
            </h2>

            <div className="font-family-sans text-[16px] sm:text-[17px] md:text-[19px] leading-[1.6] tracking-tight text-[#222f30]/80 md:columns-2 md:gap-x-10 [&>p]:mb-6 [&>p:last-child]:mb-0">
              <p>
                We are advancing a pipeline of novel small molecule therapeutics by unraveling complex biology with optogenetics, chemistry, and AI. Built on pioneering science from our scientific co-founder, Prof. Jim Collins at MIT, and powered by a world-class team of innovators, we are pushing the boundaries of how biology can be understood and engineered.
              </p>
              <p>
                Our discoveries have been repeatedly featured in <span className="italic">Nature, Nature Aging, Nature Protocols, and Cell</span>, underscoring the impact of our approach.
              </p>
              <p>
                Today, our mission targets age-related diseases, while our ultimate ambition is far bolder: to fundamentally rewrite the biology of aging.
              </p>
            </div>

            <div className="mt-2 sm:mt-0 w-full sm:w-fit">
              <Button href="#learn-more" className="w-full sm:w-auto">
                Learn more about us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}