import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/profile.js'
import { Label, MaskLines, Reveal } from './motion.jsx'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{String(n).padStart(2, '0')}{suffix}</span>
}

/** Words light up one by one as you scroll through the paragraph. */
function ScrollWords({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="about-lead">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  )
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

export default function About() {
  return (
    <section className="section about container" id="about">
      <Label no="02">About</Label>
      <div className="about-grid">
        <h2 className="display">
          <MaskLines lines={['ABOUT', <em className="serif">me</em>]} />
        </h2>
        <div>
          <ScrollWords text={profile.about[0]} />
          <Reveal><p className="about-p">{profile.about[1]}</p></Reveal>
          <div className="facts">
            {profile.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className="fact">
                <span className="mono muted">{f.label}</span>
                <span className="mono">{f.value}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="stats">
        <Reveal className="stat"><b><Counter to={2} /></b><span className="mono">Platforms — web &amp; mobile</span></Reveal>
        <Reveal className="stat" delay={0.1}><b><Counter to={3} /></b><span className="mono">Projects built &amp; building</span></Reveal>
        <Reveal className="stat" delay={0.2}><b>∞</b><span className="mono">Things left to learn</span></Reveal>
      </div>
    </section>
  )
}
