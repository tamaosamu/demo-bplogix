"use client"

import { getTopLevelMenu } from "@/lib/menu"
import { cn } from "@/lib/utils"
import { routeConfig } from "@/routes"
import { Link } from "react-router-dom"

const navs = getTopLevelMenu(routeConfig, true)
console.log(navs)

export function BottomNav() {
  const pathname = ""

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 shadow-sm md:hidden">
      <ul className="flex justify-around items-center h-16">
        {navs.map(({ path, name, icon: Icon }) => {
          const isActive = pathname === path
          return (
            <li key={path}>
              <Link
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center text-sm text-muted-foreground",
                  isActive && "text-primary"
                )}
              >
                {/* 图标直接作为组件调用 */}
                {Icon && <Icon className="w-5 h-5 mb-0.5" />}
                <span className="text-xs">{name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
