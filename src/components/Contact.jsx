import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import { Label, MaskLines, Reveal, ease } from './motion.jsx'
import Magnetic from './Magnetic.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked — the mailto link still works */ }
  }
  const links = [
    ['Email', `mailto:${profile.email}`],
    ['LinkedIn', profile.links.linkedin],
    ['GitHub', profile.links.github],
    ['LeetCode', profile.links.leetcode],
  ]

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" />
      <div className="container">
        <Label no="07">Contact</Label>
        <p className="mono muted">OPEN TO INTERNSHIPS, COLLABS &amp; GOOD IDEAS</p>
        <h2 className="contact-title">
          <MaskLines lines={["LET'S", 'BUILD', <em className="serif">something.</em>]} stagger={0.12} />
        </h2>

        <Reveal className="contact-mail">
          <a href={`mailto:${profile.email}`} className="contact-email" data-cursor="Write">{profile.email}</a>
          <button className="btn btn--ghost small" onClick={copy}>
            <motion.span key={copied ? 'y' : 'n'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, ease }}>
              {copied ? 'Copied ✓' : 'Copy email'}
            </motion.span>
          </button>
        </Reveal>

        <div className="contact-links">
          {links.map(([l, h], i) => (
            <Reveal key={l} delay={i * 0.06}>
              <Magnetic strength={0.25}>
                <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="btn">{l} <span>↗</span></a>
              </Magnetic>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <Magnetic strength={0.25}><a href={profile.resume} download className="btn btn--solid">Resume <span>↓</span></a></Magnetic>
          </Reveal>
        </div>

        <div className="contact-info mono">
          <span><span className="muted">PHONE</span> <a href={profile.phoneHref}>{profile.phone}</a></span>
          <span><span className="muted">LOCATION</span> {profile.location}</span>
        </div>
      </div>

      <footer className="footer container mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="muted">{profile.tagline}</span>
        <a href="#home" className="link-arrow">Back to top <span>↑</span></a>
      </footer>
    </section>
  )
}
