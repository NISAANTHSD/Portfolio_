import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { pillars } from '../data/profile.js'
import { ease } from './motion.jsx'

function WebMock() {
  return (
    <div className="mock-browser">
      <div className="mock-bar"><i /><i /><i /><span className="mock-url mono">nisaanth.dev</span></div>
      <div className="mock-body">
        <div className="mock-hero-block" />
        <div className="mock-row"><b /><b /><b /></div>
        <pre className="mock-code mono">
{`<App>
  <Hero />
  <Projects />
</App>`}
        </pre>
      </div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="mock-phone">
      <div className="mock-notch" />
      <div className="mock-app">
        <div className="mock-app-head"><span className="mono">9:41</span><span className="mono">● ● ●</span></div>
        <div className="mock-card mock-card--accent"><span className="mono">TRIP REQUEST</span><strong>Campus → City</strong></div>
        <div className="mock-card" /><div className="mock-card" />
        <div className="mock-tabbar"><i /><i className="on" /><i /><i /></div>
      </div>
    </div>
  )
}

function ShipMock() {
  return (
    <div className="mock-ship">
      <div className="orbit orbit--1"><span /></div>
      <div className="orbit orbit--2"><span /></div>
      <div className="mock-terminal mono">
        <p><span className="accent">$</span> npm run build</p>
        <p className="muted">✓ 42 modules transformed</p>
        <p><span className="accent">$</span> git push origin main</p>
        <p className="ok">● deployed — live</p>
      </div>
    </div>
  )
}

const mocks = [WebMock, PhoneMock, ShipMock]

function Layer({ i, progress, children }) {
  const c = (i + 0.5) / 3
  const opacity = useTransform(progress, [c - 0.28, c - 0.12, c + 0.12, c + 0.28], [0, 1, 1, 0])
  const scale = useTransform(progress, [c - 0.3, c, c + 0.3], [0.7, 1, 0.8])
  const rotateY = useTransform(progress, [c - 0.3, c, c + 0.3], [-50, 0, 40])
  const y = useTransform(progress, [c - 0.3, c, c + 0.3], [120, 0, -120])
  // first and last stay visible at the very edges
  const firstOp = useTransform(progress, [0, 0.28, 0.42], [1, 1, 0])
  const lastOp = useTransform(progress, [0.58, 0.72, 1], [0, 1, 1])
  const op = i === 0 ? firstOp : i === 2 ? lastOp : opacity
  return <motion.div className="stage-layer" style={{ opacity: op, scale, rotateY, y }}>{children}</motion.div>
}

export default function Showcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIdx(Math.min(2, Math.floor(v * 3)))
    setCount(Math.round(v * 100))
  })
  const ringRot = useTransform(progress, [0, 1], [0, 300])
  const ringRot2 = useTransform(ringRot, (r) => -r * 0.6)
  const glowX = useTransform(progress, [0, 1], ['-20%', '20%'])
  const p = pillars[idx]

  return (
    <section className="showcase" id="showcase" ref={ref}>
      <div className="showcase-sticky">
        <motion.div className="showcase-glow" style={{ x: glowX }} />
        <div className="stage">
          <motion.div className="stage-ring" style={{ rotate: ringRot }} />
          <motion.div className="stage-ring stage-ring--2" style={{ rotate: ringRot2 }} />
          {mocks.map((M, i) => (
            <Layer key={i} i={i} progress={progress}><M /></Layer>
          ))}
        </div>

        <div className="showcase-text container">
          <AnimatePresence mode="wait">
            <motion.div key={p.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <p className="label"><span className="accent">{p.id}</span> / {p.word}</p>
              <div className="mask">
                <motion.h2 className="showcase-word"
                  initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }}
                  transition={{ duration: 0.7, ease }}>
                  {p.word}
                </motion.h2>
              </div>
              <motion.p className="showcase-line" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}>{p.line}</motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="showcase-aside">
          <p className="mono accent">WHAT I DO</p>
          <p className="serif-lg">Two screens, one mindset — the browser and the phone in your pocket.</p>
          <p className="mono muted small">SCROLL / BUILD / SHIP</p>
        </aside>

        <div className="showcase-count mono">{String(count).padStart(2, '0')} / 100</div>
        <div className="showcase-dots">
          {pillars.map((x, i) => <span key={x.id} className={i === idx ? 'on' : ''} />)}
        </div>
      </div>
    </section>
  )
}
