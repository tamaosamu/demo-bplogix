// src/components/MainMenu.tsx
import { getChildrenMenuByTopLevel } from "@/lib/menu"
import { routeConfig } from "@/routes"
import { Link, type Location } from "react-router-dom"

interface SideMenuInterface {
  route: Location
}

export default function SideMenu({ route }: SideMenuInterface) {

  console.log(route.pathname)
  const menus = getChildrenMenuByTopLevel(routeConfig, route.pathname)
  console.log(menus)

  return (
    <aside className="w-48 bg-gray-100 p-4 border-r hidden md:block">
      <ul className="space-y-2 text-lg font-medium">
        {menus.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="hover:text-blue-500 transition">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
