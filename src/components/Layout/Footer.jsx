import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Button from "../Reusable/Button"

const NAVIGATE_LINKS = [
    { to: "/platform", label: "Platform" },
    { to: "/company", label: "Company" },
    { to: "/newsroom", label: "Newsroom" },
    { to: "/work-with-us", label: "Work with us" },
]

const CONNECT_LINKS = [
    { href: "https://linkedin.com", label: "LinkedIn" },
    { href: "https://x.com", label: "X" },
]

function ScrollToTop() {
    const wrapperRef = useRef(null)
    const layer1Ref = useRef(null)
    const layer2Ref = useRef(null)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        const w = wrapperRef.current
        const l1 = layer1Ref.current
        const l2 = layer2Ref.current
        if (!w || !l1 || !l2) return
        gsap.set(l1, { yPercent: 0 })
        gsap.set(l2, { yPercent: 100 })
    }, [])

    const handleMouseEnter = () => {
        if (!layer1Ref.current || !layer2Ref.current) return
        gsap.timeline()
            .to(layer1Ref.current, { yPercent: -100, duration: 0.4, ease: "power2.inOut" }, "<")
            .to(layer2Ref.current, { yPercent: 0, duration: 0.4, ease: "power2.inOut" }, "<")
    }

    const handleMouseLeave = () => {
        if (!layer1Ref.current || !layer2Ref.current) return
        gsap.timeline()
            .to(layer1Ref.current, { yPercent: 0, duration: 0.4, ease: "power2.inOut" }, "<")
            .to(layer2Ref.current, { yPercent: 100, duration: 0.4, ease: "power2.inOut" }, "<")
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Scroll to top"
        >
            <div ref={wrapperRef} className="absolute inset-0 h-12 w-12 overflow-hidden rounded-xl border border-white/30">
                <div
                    ref={layer1Ref}
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-transparent text-white"
                >
                    <span className="text-base leading-none">↑</span>
                </div>
                <div
                    ref={layer2Ref}
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white text-black"
                >
                    <span className="text-base leading-none">↑</span>
                </div>
            </div>
        </button>
    )
}

export default function Footer() {
    const contentRef = useRef(null)
    const headingRef = useRef(null)
    const footerTextRef = useRef(null)
    const footerRef = useRef(null)
    useGSAP(() => {
        if (!footerTextRef.current || !headingRef.current) return
        const triggerEl = headingRef.current
        const el = footerTextRef.current
        let tween
        const ctx = gsap.context(() => {
          tween = gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              paused: true,
            }
          )
        })
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            if (!entry?.isIntersecting || !tween) return
            tween.play()
            observer.disconnect()
          },
          { root: null, rootMargin: "0px", threshold: 0 }
        )
        observer.observe(triggerEl)
        return () => {
          observer.disconnect()
          ctx.revert()
        }
      }, { scope: contentRef })

    return (
        <footer ref={footerRef} className="relative w-full overflow-hidden bg-black" style={{ marginTop: "-35px" }}>
            {/* Background image — stays absolute, fills entire footer including the pulled-up area */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/footer-bg.png')" }}
                aria-hidden
            />
            {/* All footer content — z-10 so it's above the bg, pt compensates the negative margin */}
            <div ref={contentRef} className="relative mx-auto max-w-[1620px] px-6 pt-14 pb-10 md:px-12 lg:pt-20 lg:pb-14" style={{ zIndex: 10, paddingTop: "120px" }}>
                {/* Top row: [headline + Navigate + Connect] on left, scroll-to-top top-right */}
                <div className="flex flex-col gap-12 pb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pb-20">
                    <div ref={footerTextRef} className="flex flex-col justify-between gap-12 lg:flex-row lg:flex-1 lg:gap-16">
                        {/* Headline + Work with us */}
                        <div className="max-w-lg">
                            <h2 ref={headingRef} className="font-family-sans text-[28px] leading-[1.2] tracking-tight text-white sm:text-[32px] lg:text-[40px]">
                                We are advancing small molecule therapeutics for age-related diseases.
                            </h2>
                            <div className="mt-8">
                                <Button href="/work-with-us">Work with us</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-15">
                            {/* Navigate */}
                            <div className="shrink-0 pl-5 border-l border-white/30 h-max w-full">
                                <h3 className="font-family-mono mb-5 text-sm uppercase tracking-tight text-white">
                                    Navigate
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {NAVIGATE_LINKS.map((item) => (
                                        <li key={item.to}>
                                            <Link
                                                to={item.to}
                                                className="font-family-sans text-lg leading-[18px] text-white bg-[linear-gradient(currentColor,currentColor)] bg-bottom-left bg-no-repeat bg-size-[0_1.5px] transition-[background-size] duration-300 ease-in-out hover:bg-size-[100%_1.5px]"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div className="shrink-0 pl-5 border-l border-white/30 h-max">
                            <h3 className="font-family-mono mb-5 text-sm uppercase tracking-tight text-white">
                                    Connect
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {CONNECT_LINKS.map((item) => (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-family-sans text-lg leading-[18px] text-white bg-[linear-gradient(currentColor,currentColor)] bg-bottom-left bg-no-repeat bg-size-[0_1.5px] transition-[background-size] duration-300 ease-in-out hover:bg-size-[100%_1.5px]"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                              {/* Scroll to top — top-right corner */}
                    <div className="shrink-0 lg:pt-0">
                        <ScrollToTop />
                    </div>
                        </div>
                    </div>

                  
                </div>

                {/* Bottom: IntegratedBio then copyright, both left-aligned */}
                <div className="border-t border-white/10 pt-10 lg:pt-14">
                   <svg
                        className="logo_el w-full h-auto max-h-[80px] sm:max-h-[120px] md:max-h-[160px] lg:max-h-[200px] xl:max-h-[243px] block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1524 243"
                        fill="none"
                        preserveAspectRatio="xMinYMin meet"
                    >
                        <path fill="#fff" d="M483.621 48.818c20.514 0 35.316 8.57 44.924 22.852V51.935h23.63v131.394c0 41.288-28.564 58.686-64.918 58.686-36.614 0-56.349-17.138-59.205-45.183h24.149c2.857 17.917 15.84 24.669 35.316 24.669 19.215 0 39.989-6.492 39.989-38.172v-15.581c-9.608 13.503-24.15 21.554-43.885 21.554-40.249 0-62.321-30.123-62.321-70.372 0-40.25 22.072-70.112 62.321-70.112Zm-140.069 0c38.951 0 63.88 29.863 63.88 71.151v7.79H305.12c2.337 24.409 15.58 41.028 38.432 41.028 17.138 0 30.121-8.57 36.353-22.851h24.929c-8.569 26.746-31.16 44.144-61.282 44.144-39.211 0-64.14-30.122-64.14-70.631s24.929-70.63 64.14-70.63Zm382.985 0c35.835 0 52.454 15.062 52.454 39.211v98.935h-22.85v-16.619c-11.686 14.801-27.007 19.735-43.107 19.735-30.122 0-48.818-14.282-48.818-39.989 0-23.89 17.917-36.095 49.338-42.068l41.548-7.79v-9.607c0-15.061-10.128-21.034-28.305-21.034-15.84 0-32.2 5.194-33.238 24.15h-24.41c1.039-32.459 28.045-44.924 57.388-44.924Zm224.002 0c38.951 0 63.881 29.863 63.881 71.151v7.79H912.107c2.337 24.409 15.581 41.028 38.432 41.028 17.138 0 30.122-8.57 36.355-22.851h24.926c-8.57 26.746-31.159 44.144-61.281 44.144-39.211 0-64.14-30.122-64.14-70.631s24.929-70.63 64.14-70.63Zm208.621 138.147h-23.37V166.45c-9.35 14.802-24.67 23.63-45.18 23.63-40.25 0-62.32-30.122-62.32-70.631 0-40.508 22.07-70.63 62.32-70.63 19.99 0 34.54 8.31 44.14 22.072V0h24.41v186.965Zm298.62-138.147c41.29 0 66.22 30.122 66.22 70.631s-24.93 70.631-66.22 70.631c-41.28 0-66.21-30.122-66.21-70.631s24.93-70.63 66.21-70.63Zm-803.395 24.93h-11.166c-22.851 0-40.769 9.609-40.769 42.847v70.371h-24.409V51.936h23.37v23.37c10.387-19.475 25.708-24.928 42.587-24.928h10.387v23.37ZM25.968 186.965H0V0h25.968v186.965ZM1257.74 0c44.4 0 65.17 22.072 65.18 50.636 0 16.878-7.28 30.382-22.08 38.691 20.26 8.05 29.87 23.89 29.87 44.404 0 31.161-20.78 53.234-65.18 53.234h-78.94V0h71.15Zm114.63 186.965h-24.67V51.935h24.67v135.03ZM120.341 48.818c33.498 0 48.039 24.41 48.039 50.377v87.769h-24.409v-85.432c0-17.917-9.089-30.901-29.343-30.901-10.127 0-36.614 5.193-36.614 41.028v75.305h-24.41V51.934h23.372V71.41c9.088-12.724 23.37-22.592 43.365-22.592Zm112.053 3.115h35.835v20.773h-35.835v79.72c0 9.608 3.895 13.762 13.762 13.762h22.073v20.774h-27.266c-23.371 0-33.238-9.348-33.238-31.68V72.706h-24.669V51.933h24.669V10.385h24.669v41.548Zm606.985 0h35.835v20.773h-35.835v79.72c0 9.608 3.895 13.762 13.763 13.762h22.072v20.774h-27.266c-23.37 0-33.238-9.348-33.238-31.68V72.706h-24.669V51.933h24.669V10.385h24.669v41.548Zm-121.93 75.306c-17.138 3.636-28.045 7.531-28.045 22.073 0 12.204 7.79 20.254 26.227 20.254 19.216 0 39.47-10.646 39.471-35.835v-14.022l-37.653 7.53ZM1094.5 70.371c-27.52 0-40.76 20.514-40.76 49.078 0 28.564 13.24 49.078 40.76 49.078 27.27 0 40.51-20.514 40.51-49.078 0-28.564-13.24-49.078-40.51-49.078Zm363.28 0c-27.52 0-40.77 20.514-40.77 49.078 0 28.564 13.25 49.078 40.77 49.078 27.53 0 40.77-20.514 40.77-49.078 0-28.564-13.24-49.078-40.77-49.078Zm-970.263-.26c-27.526 0-40.769 20.514-40.769 48.819 0 28.564 13.243 48.818 40.769 48.818 27.265 0 40.508-20.254 40.508-48.818 0-28.305-13.243-48.819-40.508-48.819Zm725.033 94.002h53.5c27 0 38.69-11.426 38.69-30.641 0-19.216-11.69-30.642-38.69-30.642h-53.5v61.283ZM343.552 70.111c-21.813 0-34.796 14.802-38.172 37.134h76.344c-3.636-22.332-16.62-37.133-38.172-37.134Zm606.987 0c-21.813 0-34.796 14.802-38.172 37.134h76.344c-3.635-22.332-16.619-37.133-38.172-37.134ZM1212.55 80.24h46.23c27 0 38.69-11.426 38.69-28.824 0-17.138-11.69-28.563-38.69-28.563h-46.23v57.387Zm159.56-52.714h-24.41V0h24.41v27.525Z"></path>
                   </svg>
                    <p className="mt-4 font-family-mono text-[11px] uppercase tracking-wider text-white/85 sm:text-sm">
                        © 2026 INTEGRATED BIOSCIENCES. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    )
}
