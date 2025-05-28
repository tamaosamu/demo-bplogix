// layouts/ResponsiveLayout.tsx

import { FancyTransition } from "@/components/animate/FancyTransition"
import ScreenLoader from "@/components/share/ScreenLoader"
import { useResponsive } from "@/hooks/useResponsive"
import { AnimatePresence } from "framer-motion"
import { Suspense, lazy, useMemo } from "react"
import { useLocation, useOutlet } from "react-router-dom"

// const LazyMobileLayout = lazy(() => import("./MobileLayout"))
// const LazyTabletLayout = lazy(() => import("./TabletLayout"))
const LazyDesktopLayout = lazy(() => import("./DesktopLayout"))

export const ResponsiveLayout = () => {
  const location = useLocation()
  const outlet = useOutlet()
  const { isMobile, isTablet } = useResponsive()

  const Layout = useMemo(() => {
    // if (isMobile) return LazyMobileLayout
    // if (isTablet) return LazyTabletLayout
    return LazyDesktopLayout
  }, [isMobile, isTablet])

  return (
    <Suspense fallback={<ScreenLoader loading={true} />}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <FancyTransition key={location.pathname}>
            {outlet}
          </FancyTransition>
        </AnimatePresence>
      </Layout>
    </Suspense>
  )
}
