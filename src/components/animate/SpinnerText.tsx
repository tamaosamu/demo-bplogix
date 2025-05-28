// import * as React from "react"
import { motion } from "framer-motion"

interface SpinnerTextProps {
  content: string
}

export function SpinnerText({content}: SpinnerTextProps) {

  return (
    <motion.div
      key="spinner-text"
      className="flex space-x-1 text-sm font-mono text-gray-800"
    >
      {[...content].map((char, index) => (
        <motion.span
          key={`spinner-text-${index}`} // ✅ 字符+索引组合，确保唯一
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: 1, y: -2 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.6,
            delay: index * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}
