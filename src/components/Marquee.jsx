import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion'

/** Infinite marquee whose speed and direction react to scroll velocity. */
export default function Marquee({ items, baseVelocity = -3, outline = false }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)
  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })
  const row = items.map((t, i) => (
    <span key={i} className="marquee-item">{t}<span className="marquee-star">✦</span></span>
  ))
  return (
    <div className={`marquee ${outline ? 'marquee--outline' : ''}`}>
      <motion.div className="marquee-track" style={{ x }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  )
}
