import Badge from "../Reusable/Badge"

const WhatWeDoData = [
    {
        id: 1,
        description: "Aging is an intrinsically complex systems biology challenge. Our Integrated Platform is purpose-built to unravel its intricate networks.",
    },
    {
        id: 2,
        description: "By combining synthetic biology, chemistry, and AI, we probe disease biology with unprecedented control and precision, enabling a systematic exploration of chemical space that was previously inaccessible.",
    },
    {
        id: 3,
        description: "Through the convergence of high-fidelity biological and chemical data with advanced Al, we unlock new therapeutic opportunities for age-related diseases.",
    }
]

export default function WhatWeDo() {
    return (
        <div className="flex flex-col bg-accent max-w-[1620px] px-12 mx-auto h-full gap-11">
            <Badge>What we Do</Badge>
            <span className="w-full h-0.5 bg-white/70"></span>
            <div className="flex justify-between">
                <div className="py-3 px-5 rounded-full w-max border border-white/90 h-max font-family-mono text-sm uppercase tracking-tight text-white">
                {WhatWeDoData[0].id.toString().padStart(2, '0')}{" "}/{" "}{WhatWeDoData.length.toString().padStart(2, '0')}
                </div>
                <h1 className="text-[58px] font-family-sans text-white max-w-[892px] tracking-tight leading-16">{WhatWeDoData[0].description}</h1>
            </div>
        </div>
    )
}