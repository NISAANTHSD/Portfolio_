import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { certificates, journey } from '../data/profile.js'
import { Label, MaskLines, Reveal } from './motion.jsx'

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section className="section container" id="journey">
      <Label no="06">Journey</Label>
      <div className="section-head">
        <h2 className="display"><MaskLines lines={['THE', <em className="serif">journey</em>]} /></h2>
        <p className="section-sub">Education, hackathons and certifications — the path so far.</p>
      </div>

      <div className="timeline" ref={ref}>
        <div className="timeline-track"><motion.div className="timeline-fill" style={{ scaleY }} /></div>
        {journey.map((j, i) => (
          <Reveal key={j.title} className={`tl-item ${j.current ? 'is-current' : ''}`} delay={0.05}>
            <span className="tl-dot" />
            <span className="tl-when mono">{j.when}</span>
            <div>
              <h3>{j.title}</h3>
              <p className="muted">{j.place}</p>
            </div>
            <span className="tl-no mono">{String(i + 1).padStart(2, '0')}</span>
          </Reveal>
        ))}
      </div>

      <div className="certs">
        <Reveal><h3 className="certs-title mono"><span className="accent">✦</span> CERTIFICATIONS &amp; HACKATHONS</h3></Reveal>
        <div className="cert-grid">
          {certificates.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="cert">
              <span className="cert-icon">{['⚡', '★', '◆'][i]}</span>
              <h4>{c.title}</h4>
              <p className="muted">{c.issuer}</p>
              <p className="mono small">{c.note}</p>
              {c.href
                ? <a className="link-arrow mono" href={c.href} target="_blank" rel="noreferrer">View certificate <span>↗</span></a>
                : <span className="mono muted small">Participation</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
