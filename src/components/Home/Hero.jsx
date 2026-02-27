import heroVideo from "../../assets/hero-video.mp4";
import Button from "../Reusable/Button";

export default function Hero() {
    return (
        <section className="hero relative m-3 rounded-xl h-screen w-full overflow-hidden ">
            {/* Video background - full width, optimized */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
            >
                <source src={heroVideo} type="video/mp4" />
            </video>
            {/* Content overlay */}
            <div className="relative max-w-[1620px] mx-auto z-10 px-12 pt-37 pb-8 h-screen flex flex-col justify-between">
                <h1 className="text-[112px] font-family-sans max-w-6xl leading-[112px] text-white">
                    Engineering the future of aging medicine.
                </h1>
                <div className="flex justify-between">
                    <h2 className="text-2xl leading-7 text-white max-w-[600px] tracking-tight">We unravel complex biology with optogenetics, chemistry,
                        and AI for small molecule therapeutic discovery.</h2>
                    <Button>discover our platform</Button>
                </div>
            </div>
        </section>
    );
}