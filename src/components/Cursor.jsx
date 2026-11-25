import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Dot + lagging ring. Grows over links/buttons, shows a label over [data-cursor]. Hidden on touch. */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 })
  const [hover, setHover] = useState(false)
  const [text, setText] = useState('')
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('a, button, [data-cursor]')
      setHover(!!el)
      setText(el?.dataset?.cursor || '')
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${hover ? 'is-hover' : ''} ${text ? 'has-text' : ''}`}
        style={{ x: rx, y: ry }}
      >
        {text && <span>{text}</span>}
      </motion.div>
    </>
  )
}
