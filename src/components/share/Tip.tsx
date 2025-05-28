import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react"

interface TipProps {
  alt: ReactNode
  children: ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  className?: string
}

export function Tip({
  alt,
  children,
  side = "right",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  className = 'opacity-70',
}: TipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={className}
        >
          {alt}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
