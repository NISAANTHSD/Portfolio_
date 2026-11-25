import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Showcase from './components/Showcase.jsx'
import About from './components/About.jsx'
import Marquee from './components/Marquee.jsx'
import Featured from './components/Featured.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Journey from './components/Journey.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  // Smooth scrolling + smooth anchor links
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: 0 }) }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy() }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <>
      <div className="grain" aria-hidden />
      <Cursor />
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Navbar ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Showcase />
        <About />
        <Marquee items={['React', 'Node.js', 'Express', 'Flutter', 'JavaScript', 'Web', 'Mobile']} />
        <Featured />
        <Projects />
        <Marquee items={['Code', 'Create', 'Ship', 'Learn', 'Repeat']} baseVelocity={3} outline />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
