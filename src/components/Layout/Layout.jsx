import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, introDone }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar animateIn={introDone} />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}
