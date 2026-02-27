import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  // Initialize Lenis smooth scroll globally for the entire site
  useLenis()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
