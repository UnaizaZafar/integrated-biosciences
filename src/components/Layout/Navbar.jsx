import { Link } from 'react-router-dom'
import { Logo } from '../../assets/svgs/logo'
import { useScrollPastViewport } from '../../hooks/useScrollPastViewport'

const navLinks = [
  { to: "/platform", label: "PLATFORM" },
  { to: "/company", label: "COMPANY" },
  { to: "/newsroom", label: "NEWSROOM" },
]

const SCROLL_THRESHOLD_VH = 10

export default function Navbar() {
  const scrolledPast10vh = useScrollPastViewport(SCROLL_THRESHOLD_VH)

  return (
    <nav className="w-full max-w-[1620px] mx-auto flex justify-center items-center py-4 px-12 fixed top-5 left-0 right-0 z-50 ">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div
          className={`shrink-0 flex justify-center items-center transition-all duration-500 ease-in-out ${scrolledPast10vh ? 'bg-white/70 p-[14px] rounded-[8px]' : 'bg-transparent p-0 rounded-none'}`}
        >
          <Link to="/" className="inline-block">
            <Logo color={scrolledPast10vh ? '#222F30' : 'white'} />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="inline-flex roboto-mono-400 items-center gap-2 pl-3 pr-1 py-1 rounded-[8px] bg-white/80 backdrop-blur-sm h-[54px]">
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
        </div>
    </nav>
  )
}