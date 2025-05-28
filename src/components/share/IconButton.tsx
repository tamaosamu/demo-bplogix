import type { ReactNode } from "react"
import { Tip } from "./Tip"

interface IconButtonProps {
  children: ReactNode
  alt?: ReactNode
}

export function IconButton({ children, alt }: IconButtonProps) {
  return (
    <button className="w-10 h-10 rounded-lg bg-muted hover:bg-accent text-lg font-bold text-foreground flex items-center justify-center">
      {alt ? <Tip alt={alt}>{children}</Tip> : children}
    </button>
  )
}
