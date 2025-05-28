import type { AppRouteObject } from "@/routes"
import type { LucideIcon } from "lucide-react"

export interface MenuObject {
  path: string
  name: string
  icon?: LucideIcon
}

export const getChildrenMenuByTopLevel = (
  routes: AppRouteObject[],
  topLevelFullPath: string
): MenuObject[] => {
  const rootRoute = routes.find((r) => r.path === "/")
  if (!rootRoute || !rootRoute.children) return []

  const topLevelPath = topLevelFullPath.split("/").filter(s => s)[0]
  console.log(topLevelPath)
  if (!topLevelPath) return []

  const topLevel = rootRoute.children.find(
    (r) => r.path?.replace("/", "") === topLevelPath
  ) as AppRouteObject
  if (!topLevel || !topLevel.children) return []

  return topLevel.children
    .filter((item: AppRouteObject) => item.showInMenu)
    .map((route) => {
      const fullPath =
        route.index === true
          ? topLevel.path ?? ""
          : route.path?.startsWith("/")
          ? topLevel.path + route.path
          : topLevel.path + `/${route.path}`
      return {
        path: fullPath,
        name: route.name!,
        icon: route.icon!,
      }
    })
}

export const getTopLevelMenu = (
  routes: AppRouteObject[],
  isMobileMenu: boolean = false
): MenuObject[] => {
  const rootRoute = routes.find((r) => r.path === "/")
  if (!rootRoute || !rootRoute.children) return []

  const parentPath = rootRoute.path ?? "/"
  const childrenRoutes: AppRouteObject[] = rootRoute.children

  return childrenRoutes
    .filter((route) => {
      if (!route.name) return false
      if (isMobileMenu) {
        return route.showInMenu && route.showInMobileMenu
      }
      return route.showInMenu
    })
    .map((route) => {
      const fullPath =
        route.index === true
          ? parentPath
          : route.path?.startsWith("/")
          ? route.path
          : `/${route.path}`

      return {
        path: fullPath,
        name: route.name!,
        icon: route.icon!,
      }
    })
}
