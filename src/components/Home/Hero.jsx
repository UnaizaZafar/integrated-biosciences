import heroVideo from "../../assets/hero-video.mp4";
import Button from "../Reusable/Button";
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport";

const SCROLL_THRESHOLD_VH = 10;

export default function Hero() {
    const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH);

    return (
        <div
            className={`w-full max-w-[100vw] overflow-x-hidden transition-[padding] duration-500 ease-in-out ${scrolledPast10vh ? 'p-0' : 'px-3 py-3'}`}
        >
            <section
                className={`hero relative h-screen w-full min-w-0 overflow-hidden transition-[border-radius] duration-500 ease-in-out ${scrolledPast10vh ? 'rounded-none' : 'rounded-xl'}`}
            >
                {/* Video background - full width, optimized */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                {/* Content overlay */}
                <div className="relative max-w-[1620px] mx-auto z-10 px-6 sm:px-12 pt-37 pb-8 h-full min-h-screen flex flex-col justify-between box-border">
                    <h1 className="text-[112px] font-family-sans max-w-6xl leading-[112px] text-white min-w-0">
                    Engineering the future of aging medicine.
                </h1>
                <div className="flex flex-wrap items-end justify-between gap-4 min-w-0">
                    <h2 className="text-2xl leading-7 text-white max-w-[600px] min-w-0 tracking-tight">We unravel complex biology with optogenetics, chemistry,
                        and AI for small molecule therapeutic discovery.</h2>
                    <Button className="shrink-0">discover our platform</Button>
                </div>
            </div>
            </section>
        </div>
    );
}