import type { ReactNode } from "react"

interface BackdropProps {
  children: ReactNode
  fullScreen: boolean
}

export function Backdrop({ children, fullScreen = true }: BackdropProps) {
  return (
    <div
      className={`
      ${fullScreen ? "fixed" : "absolute"} inset-0
      z-50 flex items-center justify-center
      pointer-events-none bg-white/65 backdrop-blur-[2px]
    `}
    >
      <div
        className="flex flex-col items-center space-y-4
                 bg-white/20 rounded-xl p-8
                 pointer-events-auto"
      >
        {children}
      </div>
    </div>
  )
}
