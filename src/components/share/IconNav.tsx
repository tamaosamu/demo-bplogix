import { getTopLevelMenu } from "@/lib/menu"
import { cn } from "@/lib/utils"
import { routeConfig } from "@/routes"
import { Link } from "react-router-dom"
import { IconButton } from "./IconButton"

const navs = getTopLevelMenu(routeConfig, true)
export function IconNav() {
  const pathname = ""
  return (
    <ul className="flex flex-col items-center mt-2">
      {navs.map(({ path, name, icon: Icon }) => {
        const isActive = pathname === path
        return (
          <li key={path} className="flex justify-center mb-2">
            <IconButton alt={name}>
              <Link
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center text-sm text-muted-foreground",
                  isActive && "text-primary"
                )}
              >
                {Icon && <Icon className="w-6 h-6" />}{" "}
              </Link>
            </IconButton>
          </li>
        )
      })}
    </ul>
  )
}
