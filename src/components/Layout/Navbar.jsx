import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Logo } from "../../assets/svgs/logo"
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet"

const navLinks = [
    { to: "/platform", label: "Platform" },
    { to: "/company", label: "Company" },
    { to: "/newsroom", label: "Newsroom" },
]

const SCROLL_THRESHOLD_VH = 10

function MenuIcon({ className }) {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

function CloseIcon({ className }) {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}

export default function Navbar({ animateIn }) {
    const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH)
    const navRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    useGSAP(
        () => {
            if (!animateIn || !navRef.current) return
            const ctx = gsap.context(() => {
                gsap.to(navRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.in",
                    delay: 0.2,
                    onComplete: () => setHasAnimated(true),
                })
            }, navRef)
            return () => ctx.revert()
        },
        { dependencies: [animateIn] }
    )

    return (
        <nav
            ref={navRef}
            style={animateIn && !hasAnimated ? { opacity: 0 } : undefined}
            className="w-full max-w-[1620px] mx-auto flex justify-center items-center py-4 px-12 fixed top-5 left-0 right-0 z-50"
        >
            <div className="w-full flex justify-between items-center max-lg:bg-white/50 max-lg:p-2 rounded-xl">
                {/* Logo */}
                <div
                    className={`shrink-0 flex justify-center items-center transition-all duration-500 ease-in-out ${scrolledPast10vh ? "bg-white/70 p-[14px] rounded-[8px]" : "bg-transparent p-0 rounded-none"}`}
                >
                    <Link to="/" className="inline-block">
                        <Logo
                            color={
                                scrolledPast10vh ? "#222F30" : "white"
                            }
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:inline-flex roboto-mono-400 items-center gap-2 pl-3 pr-1 py-1 rounded-[8px] bg-white/80 backdrop-blur-sm h-[54px]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="px-4 py-2 h-full place-content-center text-[#222F30] uppercase text-sm hover:bg-white/90 rounded-[8px] transition-opacity"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/work-with-us"
                        className="px-4 py-2 h-full place-content-center uppercase text-sm rounded-[8px] transition-colors duration-300 ease-in-out bg-[#222F30] text-white hover:bg-white hover:text-[#222F30]"
                    >
                        WORK WITH US
                    </Link>
                </div>

                {/* Mobile: Hamburger + Sheet menu */}
                <Sheet>
                    <SheetTrigger
                        className="lg:hidden flex items-center justify-center w-12 h-12 rounded-[8px] bg-[#222F30] text-accent hover:bg-[#222F30]/90 transition-colors"
                        aria-label="Open menu"
                    >
                        <MenuIcon className="w-6 h-6" />
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="!left-auto !top-4 !right-4 !bottom-4 !h-[calc(100vh-2rem)] !w-[calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#262E2A] p-0 flex flex-col overflow-hidden shadow-xl"
                    >
                        {/* Base dark background */}
                        <div className="absolute inset-0 bg-[#262E2A]" aria-hidden />
                        {/* Pattern: overlay so it’s visible on dark base (lighten blend makes light lines show) */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-50 mix-blend-lighten"
                            style={{
                                backgroundImage: "url(/images/pattern-bg.png)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            aria-hidden
                        />
                        <SheetHeader className="relative z-10 flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
                            <SheetTitle asChild className="!m-0">
                                <SheetClose asChild>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2 text-white font-family-sans text-xl"
                                    >
                                        <Logo color="white" />
                                    </Link>
                                </SheetClose>
                            </SheetTitle>
                            <SheetClose
                                className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-[#A7E26E] text-white hover:bg-white/10 transition-colors"
                                aria-label="Close menu"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </SheetClose>
                        </SheetHeader>
                        <nav className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 py-12">
                            {navLinks.map((link) => (
                                <SheetClose key={link.to} asChild>
                                    <Link
                                        to={link.to}
                                        className="text-white font-family-sans text-2xl md:text-3xl hover:opacity-80 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </SheetClose>
                            ))}
                            <SheetClose asChild>
                                <Link
                                    to="/work-with-us"
                                    className="text-white font-family-sans text-2xl md:text-3xl hover:opacity-80 transition-opacity"
                                >
                                    Work with us
                                </Link>
                            </SheetClose>
                        </nav>
                        <div className="relative z-10 flex justify-center pb-10 pt-6">
                            <a
                                href="mailto:hello@integratedbio.com"
                                className="text-white text-sm md:text-base underline underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                hello@integratedbio.com
                            </a>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
