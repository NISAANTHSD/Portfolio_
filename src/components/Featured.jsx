import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featured } from '../data/profile.js'
import { Label, MaskLines, Reveal } from './motion.jsx'

/** Illustrative preview (not a screenshot) — dashboard + phone with an animated route. */
function TripZoPreview() {
  return (
    <div className="tz">
      <div className="tz-dash">
        <div className="tz-side">
          <b className="tz-logo">TZ</b>
          {['Requests', 'Drivers', 'Vehicles', 'EV Requests'].map((t, i) => (
            <span key={t} className={i === 0 ? 'on' : ''}>{t}</span>
          ))}
        </div>
        <div className="tz-main">
          <div className="tz-kpis">
            {[['Requests', 'Pending'], ['Drivers', 'Assigned'], ['Fleet', 'Active']].map(([a, b]) => (
              <div key={a} className="tz-kpi"><span className="mono">{a}</span><i /><small>{b}</small></div>
            ))}
          </div>
          <div className="tz-map">
            <svg viewBox="0 0 300 140" preserveAspectRatio="none">
              <path className="tz-route" d="M10 120 C 70 20, 120 130, 170 60 S 260 30, 290 20" />
              <circle className="tz-bus" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M10 120 C 70 20, 120 130, 170 60 S 260 30, 290 20" /></circle>
              <circle cx="10" cy="120" r="4" className="tz-stop" />
              <circle cx="290" cy="20" r="4" className="tz-stop" />
            </svg>
            <span className="tz-map-tag mono">ROUTE · LIVE PREVIEW</span>
          </div>
          <div className="tz-table">
            {['Faculty trip · Bus 04', 'EV request · Block C', 'Driver assigned · Van 2'].map((r, i) => (
              <div key={r} className="tz-tr"><span>{r}</span><em className={`tz-badge tz-badge--${i}`}>{['Approved', 'Review', 'Assigned'][i]}</em></div>
            ))}
          </div>
        </div>
      </div>
      <div className="tz-phone">
        <div className="mock-notch" />
        <div className="tz-phone-in">
          <span className="mono small accent">NEW REQUEST</span>
          <strong>⚡ EV / Battery vehicle</strong>
          <div className="tz-field"><small>From</small>Main Gate</div>
          <div className="tz-field"><small>To</small>Admin Block</div>
          <button className="tz-btn">Request ride</button>
        </div>
      </div>
      <span className="tz-note mono">CONCEPT PREVIEW — UI IN DEVELOPMENT</span>
    </div>
  )
}

export default function Featured() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotX = useTransform(scrollYProgress, [0, 0.4], [25, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1])
  const bg = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section className="section featured" id="tripzo" ref={ref}>
      <motion.div className="featured-bgword" style={{ x: bg }} aria-hidden>TRIPZO</motion.div>
      <div className="container">
        <Label no="03">Currently building</Label>
        <div className="featured-head">
          <h2 className="display">
            <MaskLines lines={[<>TRIPZO<span className="accent">.</span></>, <em className="serif">{featured.subtitle}</em>]} />
          </h2>
          <Reveal className="status-pill mono"><span className="pulse" /> {featured.status}</Reveal>
        </div>

        <motion.div className="featured-preview" style={{ rotateX: rotX, scale }}>
          <TripZoPreview />
        </motion.div>

        <div className="featured-body">
          <Reveal><p className="featured-desc">{featured.description}</p></Reveal>
          <ul className="featured-list">
            {featured.features.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 0.06}><span className="mono accent">0{i + 1}</span>{f}</Reveal>
            ))}
          </ul>
        </div>
        <div className="featured-meta">
          {featured.meta.map((m, i) => (
            <Reveal key={m.k} delay={i * 0.08} className="meta">
              <span className="mono muted">{m.k}</span><b>{m.v}</b>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
