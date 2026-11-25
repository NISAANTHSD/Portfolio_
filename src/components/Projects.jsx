import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '../data/profile.js'
import { Label, MaskLines, easeOut } from './motion.jsx'

function TiltCard({ p, i }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(500px circle at ${gx} ${gy}, hsla(${p.hue}, 90%, 60%, 0.18), transparent 45%)`

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { mx.set(0.5); my.set(0.5) }
  const primary = p.links[0]?.href
  const open = (e) => {
    if (!primary || e.target.closest('a')) return // inner links handle themselves
    window.open(primary, '_blank', 'noopener,noreferrer')
  }
  const onKey = (e) => { if (e.key === 'Enter') open(e) }

  return (
    <motion.article
      ref={ref}
      className="pcard"
      style={{ rotateX: rx, rotateY: ry, '--hue': p.hue }}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={open}
      onKeyDown={onKey}
      role={primary ? 'link' : undefined}
      tabIndex={primary ? 0 : undefined}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease: easeOut, delay: (i % 2) * 0.12 }}
      data-cursor={p.links.length ? 'Open' : 'Soon'}
    >
      <motion.div className="pcard-glare" style={{ background: glare }} />
      <div className="pcard-art" aria-hidden>
        <span className="pcard-no">{p.no}</span>
        <div className="pcard-shape" />
      </div>
      <div className="pcard-body">
        <p className="mono muted">PROJECT {p.no} · {p.kind.toUpperCase()}</p>
        <h3>{p.name}</h3>
        <p className="pcard-desc">{p.description}</p>
        <div className="tags">{p.tags.map((t) => <span key={t} className="tag mono">{t}</span>)}</div>
        <div className="pcard-links">
          {p.links.length
            ? p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="link-arrow mono">
                  {l.label} <span>↗</span>
                </a>
              ))
            : <span className="mono muted small">Links coming soon</span>}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section className="section container" id="work">
      <Label no="04">Selected work</Label>
      <div className="section-head">
        <h2 className="display"><MaskLines lines={['SELECTED', <em className="serif">work</em>]} /></h2>
        <p className="section-sub">Things I've built while learning — games, landing pages and full web apps.</p>
      </div>
      <div className="pgrid">
        {projects.map((p, i) => <TiltCard key={p.name} p={p} i={i} />)}
      </div>
    </section>
  )
}
