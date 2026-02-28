import Badge from "../Reusable/Badge";
import Button from "../Reusable/Button";

export default function IntegratedPlatform() {
    return (
        <div className="bg-[#f7f7f5] w-full relative z-10 ">
        <div className="flex gap-5 pt-40 pb-33 px-12 max-w-[1620px] mx-auto">
            <span className="w-[33%] border-t border-[#222f301a] pt-12 rounded-t-2xl">
            <Badge color="#222f30">The integrated platform</Badge>
            </span>
            <div className="w-[66%] flex flex-col gap-15 border-t border-[#222f301a] pt-12 rounded-t-2xl">
                <h2 className="text-[76px] font-family-sans leading-21 tracking-tight text-[#222f30]">Combining synthetic biology, chemistry, and AI into an 
                  {" "}  <span className="text-secondary">engine of discovery</span>.</h2>
                <p className="text-lg font-family-sans leading-6 tracking-tight text-[#222f30cc]">
                Our platform enables precise, dynamic control of biological targets and pathways, generating high-fidelity datasets that, combined with advanced AI, unlock systematic exploration of previously inaccessible chemical space. At its core are our ultra-large, in-house aging datasets, which provide a rich foundation for target identification and therapeutic discovery.
                    </p>
                <Button>Discover our platform</Button>
            </div>
        </div>
        </div>
    )
}