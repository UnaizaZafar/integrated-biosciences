import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Logo } from "../../assets/svgs/logo"
import { useScrollPastViewport } from "../../hooks/useScrollPastViewport"

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
    const mobileMenuRef = useRef(null)
    const overlayRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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

    useGSAP(
        () => {
            if (!mobileMenuRef.current || !overlayRef.current) return
            gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" })
            gsap.set(mobileMenuRef.current, {
                clipPath: "inset(0% 0 100% 0)",
                opacity: 0,
                pointerEvents: "none",
            })
        },
        { dependencies: [] }
    )

    const openMenu = () => {
        if (!overlayRef.current || !mobileMenuRef.current) return
        gsap.set(overlayRef.current, { pointerEvents: "auto" })
        gsap.set(mobileMenuRef.current, { pointerEvents: "auto" })
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
        })
        gsap.to(mobileMenuRef.current, {
            clipPath: "inset(0% 0 0% 0)",
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
                const menuItems = mobileMenuRef.current?.querySelectorAll(
                    "a[href], button"
                )
                if (menuItems?.length) {
                    gsap.fromTo(
                        menuItems,
                        { opacity: 0, y: 10 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.06,
                            duration: 0.4,
                            ease: "power2.out",
                            delay: 0.2,
                        }
                    )
                }
            },
        })
    }

    const closeMenu = () => {
        if (!overlayRef.current || !mobileMenuRef.current) return
        gsap.to(mobileMenuRef.current, {
            clipPath: "inset(0% 0 100% 0)",
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
                gsap.set(mobileMenuRef.current, { pointerEvents: "none" })
            },
        })
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
                gsap.set(overlayRef.current, { pointerEvents: "none" })
            },
        })
    }

    const prevOpenRef = useRef(undefined)
    useEffect(() => {
        if (prevOpenRef.current === undefined) {
            prevOpenRef.current = isOpen
            return
        }
        if (prevOpenRef.current === isOpen) return
        prevOpenRef.current = isOpen
        if (isOpen) openMenu()
        else closeMenu()
    }, [isOpen])

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

                {/* Mobile: Hamburger + GSAP-animated menu (always in DOM, hidden via GSAP) */}
                <button
                    type="button"
                    className="lg:hidden cursor-pointer flex items-center justify-center w-12 h-12 rounded-[8px] bg-[#222F30] text-accent hover:bg-[#222F30]/90 transition-colors"
                    aria-label="Open menu"
                    onClick={() => setIsOpen(true)}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile menu overlay + panel: always mounted for GSAP */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[100] bg-black/80 lg:hidden"
                aria-hidden
                onClick={() => setIsOpen(false)}
            />
            <div
                ref={mobileMenuRef}
                className="fixed left-4 right-4 top-4 bottom-4 z-[101] mx-auto flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1F2937] p-0 shadow-xl lg:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
            >
                <div className="absolute inset-0 bg-[#222F30]" aria-hidden />
                <div
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                        backgroundImage: "url(/images/pattern-bg.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    aria-hidden
                />
                <header className="relative z-10 flex flex-row items-center justify-between px-6 py-4 bg-[#333F40] backdrop-blur-sm rounded-xl">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white font-family-sans text-xl"
                        onClick={() => setIsOpen(false)}
                    >
                        <Logo color="white" />
                    </Link>
                    <button
                        type="button"
                        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl border-2 border-[#A7E26E] text-white hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                        onClick={() => setIsOpen(false)}
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </header>
                <nav className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 py-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="relative text-white font-family-sans text-2xl sm:text-[46px] after:absolute after:left-0 after:bottom-0 after:block after:h-0.5 after:w-0 after:bg-white after:content-[''] after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/work-with-us"
                        className="relative text-white font-family-sans text-2xl sm:text-[46px] after:absolute after:left-0 after:bottom-0 after:block after:h-0.5 after:w-0 after:bg-white after:content-[''] after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
                        onClick={() => setIsOpen(false)}
                    >
                        Work with us
                    </Link>
                </nav>
                <div className="relative z-10 flex justify-center pb-10 pt-6">
                    <a
                        href="mailto:hello@integratedbio.com"
                        className="text-white text-sm sm:text-xl underline underline-accent underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                        hello@integratedbio.com
                    </a>
                </div>
            </div>
        </nav>
    )
}
