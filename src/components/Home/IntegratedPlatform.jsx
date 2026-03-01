import { useRef } from "react"
import Badge from "../Reusable/Badge"
import Button from "../Reusable/Button"
import { useMaskedTextReveal } from "../../hooks/useMaskedTextReveal"

export default function IntegratedPlatform() {
    const headingRef = useRef(null)
    useMaskedTextReveal(headingRef)

    return (
        <div className="bg-[#f7f7f5] w-full relative z-10 ">
        <div className="flex max-lg:flex-col gap-5 pt-40 pb-33 px-12 max-w-[1620px] mx-auto">
            <span className="max-lg:w-full lg:w-[33%] border-t border-[#222f301a] pt-12 rounded-t-2xl">
            <Badge className="bg-white" color="#222f30">The integrated platform</Badge>
            </span>
            <div className="max-lg:w-full lg:w-[66%] flex flex-col gap-8 lg:gap-15 lg:border-t border-[#222f301a] lg:pt-12 rounded-t-2xl">
                <h2 ref={headingRef} className="text-[50px] lg:text-[76px] font-family-sans leading-tight lg:leading-21 tracking-tight text-[#222f30]">Combining synthetic biology, chemistry, and AI into an 
                  {" "}  <span className="text-secondary">engine of discovery</span>.</h2>
                <p className="text-base lg:text-lg font-family-sans leading-6 tracking-tight text-[#222f30cc]">
                Our platform enables precise, dynamic control of biological targets and pathways, generating high-fidelity datasets that, combined with advanced AI, unlock systematic exploration of previously inaccessible chemical space. At its core are our ultra-large, in-house aging datasets, which provide a rich foundation for target identification and therapeutic discovery.
                    </p>
                <Button>Discover our platform</Button>
            </div>
        </div>
        </div>
    )
}