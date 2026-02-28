import Badge from "../Reusable/Badge";
import Button from "../Reusable/Button";

export default function OurCompany() {
  return (
    <div className="relative z-10 w-full bg-[#f7f7f5] pb-16 md:pb-24 lg:pb-40">
      <div className="mx-auto flex max-w-[1620px] flex-col gap-8 rounded-t-2xl border-t border-[#222f301a] pt-8 md:gap-13 md:pt-12">
        <span className="px-6 pb-8 md:px-12 md:pb-13">
          <Badge color="#222f30">Our Company</Badge>
        </span>

        <div className="grid grid-cols-1 gap-8 px-6 pb-8 md:grid-cols-2 md:gap-16 md:px-12 md:pb-12">
          {/* Left: image with rounded corners */}
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            <img
              src="/Integrated_Biosciences-scaled.jpg"
              alt="Scientists in a laboratory collaborating on research"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: headline, body copy (2 columns), CTAs */}
          <div className="flex flex-col justify-center gap-6 md:gap-8">
            <h2 className="font-family-sans text-[28px] leading-[1.2] tracking-tight text-[#222f30] sm:text-[32px] md:text-[40px] lg:text-[42px]">
              Bold research to unlock small molecule discovery for human health and aging.
            </h2>

            <div className="font-family-sans text-[17px] leading-[1.6] tracking-tight text-[#222f30]/80 md:columns-2 md:gap-x-10 md:text-[19px] [&>p]:mb-6 [&>p:last-child]:mb-0">
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

              <Button href="#learn-more">Learn more about us</Button>
             
          </div>
        </div>
      </div>
    </div>
  );
}