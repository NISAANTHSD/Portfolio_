import { motion } from 'framer-motion'

export const ease = [0.76, 0, 0.24, 1]
export const easeOut = [0.16, 1, 0.3, 1]

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    >
      {children}
    </Tag>
  )
}

/** Each line slides up from behind a mask. `lines` is an array of strings or nodes. */
export function MaskLines({ lines, className, delay = 0, stagger = 0.1, animate }) {
  const trigger = animate === undefined
    ? { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { animate: animate ? 'show' : 'hidden' }
  return (
    <motion.span className={className} initial="hidden" {...trigger} style={{ display: 'block' }}>
      {lines.map((line, i) => (
        <span className="mask" key={i}>
          <motion.span
            className="mask-inner"
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Section label like "02 / ABOUT" with a drawn line. */
export function Label({ no, children }) {
  return (
    <Reveal className="label" y={16}>
      <span className="accent">{no}</span> / {children}
    </Reveal>
  )
}
