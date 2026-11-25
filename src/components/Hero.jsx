import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/profile.js'
import { MaskLines, ease, easeOut } from './motion.jsx'
import Magnetic from './Magnetic.jsx'
import Starfield from './Starfield.jsx'

function RotatingRole({ ready }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [ready])
  const word = profile.roles[i]
  return (
    <span className="role-rotator" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span key={word} className="role-word" initial="hidden" animate="show" exit="exit">
          {word.split('').map((ch, k) => (
            <motion.span
              key={k}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              variants={{
                hidden: { y: '100%', opacity: 0, rotateX: -90 },
                show: { y: '0%', opacity: 1, rotateX: 0, transition: { delay: k * 0.025, duration: 0.5, ease: easeOut } },
                exit: { y: '-100%', opacity: 0, transition: { delay: k * 0.012, duration: 0.3, ease } },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      <span className="role-caret" />
    </span>
  )
}

export default function Hero({ ready }) {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 800], [0, 220])
  const fade = useTransform(scrollY, [0, 600], [1, 0])
  const orbY = useTransform(scrollY, [0, 800], [0, -160])

  const fadeUp = (d) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: easeOut, delay: d },
  })

  return (
    <section className="hero" id="home">
      <Starfield />
      <motion.div className="hero-orb" style={{ y: orbY }} />
      <div className="hero-vignette" />

      <motion.div className="hero-side mono" {...fadeUp(1.6)}>WEB · MOBILE · 2026</motion.div>
      <motion.div className="hero-side hero-side--b mono" {...fadeUp(1.7)}>
        <span className="accent">/</span> BUILD <span className="accent">/</span> LEARN <span className="accent">/</span> SHIP
      </motion.div>

      <motion.div className="hero-inner container" style={{ y: yText, opacity: fade }}>
        <motion.p className="eyebrow mono" {...fadeUp(0.3)}>
          <span className="pulse" /> CSE STUDENT · BANNARI AMMAN INSTITUTE OF TECHNOLOGY
        </motion.p>

        <motion.p className="hero-hi" {...fadeUp(0.45)}>Hi, I'm <em>{profile.name}.</em></motion.p>

        <h1 className="hero-title">
          <MaskLines
            animate={ready}
            delay={0.5}
            lines={[
              'I BUILD',
              <>WEB &amp; MOBILE</>,
              <em className="serif">experiences.</em>,
            ]}
          />
        </h1>

        <motion.div className="hero-role" {...fadeUp(1.1)}>
          <span className="mono muted">I'M A&nbsp;</span>
          <RotatingRole ready={ready} />
        </motion.div>

        <motion.p className="hero-copy" {...fadeUp(1.25)}>
          <strong>{profile.heroTitle}.</strong> {profile.heroSub}
        </motion.p>

        <motion.div className="hero-ctas" {...fadeUp(1.4)}>
          <Magnetic><a href="#work" className="btn btn--solid">View my work <span>↗</span></a></Magnetic>
          <Magnetic><a href={profile.resume} download className="btn">Download resume <span>↓</span></a></Magnetic>
          <Magnetic><a href="#contact" className="btn btn--ghost">Contact me <span>→</span></a></Magnetic>
        </motion.div>
      </motion.div>

      <motion.a href="#showcase" className="scroll-cue mono" {...fadeUp(1.8)}>
        <span className="scroll-line" /> SCROLL TO EXPLORE
      </motion.a>
    </section>
  )
}
