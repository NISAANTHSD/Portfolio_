import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from './motion.jsx'

const words = ['Design', 'Develop', 'Deploy', 'Nisaanth S D']

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n += Math.max(1, Math.round((100 - n) / 9))
      if (n >= 100) {
        n = 100
        clearInterval(id)
        setTimeout(onDone, 450)
      }
      setCount(n)
    }, 45)
    return () => clearInterval(id)
  }, [onDone])

  const word = words[Math.min(words.length - 1, Math.floor(count / 26))]

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1, ease } }}
    >
      <div className="preloader-top">
        <span>NISAANTH S D / DEV</span>
        <span>PORTFOLIO © {new Date().getFullYear()}</span>
      </div>
      <motion.div key={word} className="preloader-word"
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
        <span className="accent">●</span> {word}
      </motion.div>
      <div className="preloader-bottom">
        <div className="preloader-bar"><span style={{ width: `${count}%` }} /></div>
        <div className="preloader-count">{String(count).padStart(3, '0')}</div>
      </div>
    </motion.div>
  )
}
