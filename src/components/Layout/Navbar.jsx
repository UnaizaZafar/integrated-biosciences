import { Link } from 'react-router-dom'
import { Logo } from '../../assets/svgs/logo'

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center py-4 px-6 fixed top-5 left-0 right-0 z-50 ">
      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/" className="inline-block">
            <Logo color='white'/>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="inline-flex roboto-mono-400 items-center gap-2 pl-3 pr-1 py-1 rounded-[12px] bg-white/80 backdrop-blur-sm h-[54px]">
          <Link
            to="/platform"
            className="px-4 py-2 text-[#222F30] uppercase text-sm font-[400] hover:opacity-70 transition-opacity"
          >
            PLATFORM
          </Link>
          <Link
            to="/company"
            className="px-4 py-2 text-[#222F30] uppercase text-sm font-[400] hover:opacity-70 transition-opacity"
          >
            COMPANY
          </Link>
          <Link
            to="/newsroom"
            className="px-4 py-2 text-[#222F30] uppercase text-sm font-[400] hover:opacity-70 transition-opacity"
          >
            NEWSROOM
          </Link>
          <Link
            to="/work-with-us"
            className="px-5 py-2 rounded-[10px] bg-[#222F30] text-white uppercase text-sm font-[400] hover:opacity-90 transition-opacity"
          >
            WORK WITH US
          </Link>
        </div>
      </div>
    </nav>
  )
}