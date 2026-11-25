import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ease } from './motion.jsx'

const links = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Work', '#work'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
]

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease, delay: 0.6 }}
      >
        <a href="#home" className="nav-logo">NISAANTH S D <span className="accent">/</span> DEV</a>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              <span data-text={label}>{label}</span>
            </a>
          ))}
        </nav>
        <button className={`nav-burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span />
        </button>
        <motion.div className="nav-progress" style={{ scaleX }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease }}
          >
            {links.map(([label, href], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease }}
              >
                <span className="accent mono">0{i + 1}</span> {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
