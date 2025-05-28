// import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function Spinner() {

  const containerSize = 24
  const leafWidth = 3
  const leafHeight = 6
  const leafCount = 8
  const radius = containerSize / 2 - leafHeight / 2

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % leafCount)
    }, 80) // 每 80ms 切换一次
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn("relative")}
      style={{ width: containerSize, height: containerSize }}
    >
      {Array.from({ length: leafCount }).map((_, i) => {
        const angle = (i * 360) / leafCount
        // 计算透明度，当前叶片最亮，其余逐渐变暗
        const diff = (i - activeIndex + leafCount) % leafCount
        const opacity = 0.3 + (1 - diff / leafCount) * 0.7

        return (
          <motion.div
            key={i}
            className="absolute bg-current rounded-sm"
            style={{
              width: leafWidth,
              height: leafHeight,
              left: "50%",
              top: "50%",
              marginLeft: -leafWidth / 2,
              marginTop: -leafHeight / 2,
              transform: `
                rotate(${angle}deg)
                translateY(-${radius}px)
              `,
              transformOrigin: 'center center',
              opacity,
            }}
          />
        )
      })}
    </div>
  )
}
