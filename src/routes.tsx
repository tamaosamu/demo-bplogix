// src/routes.ts
import { createBrowserRouter, type RouteObject } from "react-router-dom"
import Print from "@/pages/Print"
import type { LucideIcon } from "lucide-react"

export type AppRouteObject = RouteObject & {
  name?: string
  icon?: LucideIcon
  showInMenu?: boolean
  showInMobileMenu?: boolean
  children?: AppRouteObject[]
}

export const routeConfig: AppRouteObject[] = [
  {
    path: "/",
    element: <Print />,
    
  },
]

export const router = createBrowserRouter([...routeConfig])
