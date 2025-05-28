import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog"

interface AlertProps {
  title?: string
  children: ReactNode
  open: boolean
}

export function Alert({ title, children, open}: AlertProps) {

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="p-4">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
