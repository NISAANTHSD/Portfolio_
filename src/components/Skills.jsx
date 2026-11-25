import { motion } from 'framer-motion'
import { skills } from '../data/profile.js'
import { Label, MaskLines, easeOut } from './motion.jsx'

export default function Skills() {
  return (
    <section className="section container" id="skills">
      <Label no="05">Toolkit</Label>
      <div className="section-head">
        <h2 className="display"><MaskLines lines={['MY', <em className="serif">stack</em>]} /></h2>
        <p className="section-sub">An honest snapshot — I'm early in my journey and levelling up every week.</p>
      </div>
      <div className="skills">
        {skills.map((g, gi) => (
          <motion.div
            key={g.group}
            className="skill-col"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ staggerChildren: 0.06, delayChildren: gi * 0.08 }}
          >
            <motion.div className="skill-head" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <span className="mono accent">0{gi + 1}</span>
              <h3>{g.group}</h3>
              <span className="level mono">{g.level}</span>
            </motion.div>
            {g.items.map((s) => (
              <motion.div
                key={s}
                className="skill-item"
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } } }}
              >
                <span>{s}</span><span className="skill-arrow">→</span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
