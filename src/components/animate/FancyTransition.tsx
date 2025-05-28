// components/FancyPageTransition.tsx
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const FancyTransition = ({ children }: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        rotateZ: -2,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        filter: 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
        rotateZ: 3,
        filter: 'blur(12px)',
      }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="w-full h-full transition-fancy"
    >
      {/* 页面内容 */}
      {children}
    </motion.div>
  )
}
