import { breakpoints } from '@/constants/breakpoints'
import { useEffect, useState } from 'react'

type Breakpoint =
  | 'mobile-mini'
  | 'mobile-small'
  | 'mobile'
  | 'tablet'
  | 'desktop'

export interface ResponsiveInfo {
  breakpoint: Breakpoint // 设备
  width: number 
  height: number
  orientation: 'portrait' | 'landscape' // 横屏/竖屏
  isTouchDevice: boolean // 是否触摸
  dpr: number // 像素比
  isMobile: boolean // 是否移动
  isTablet: boolean // 是否平板
  isDesktop: boolean // 是否桌面
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < breakpoints.smallMobile) return 'mobile-mini'
  if (width >= breakpoints.smallMobile && width < breakpoints.oldMobile) return 'mobile-small'
  if (width >= breakpoints.oldMobile && width < breakpoints.tablet) return 'mobile'
  if (width >= breakpoints.tablet && width < breakpoints.laptop) return 'tablet'
  return 'desktop'
}

const getOrientation = (): 'portrait' | 'landscape' => {
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
}

const isTouchDevice = (): boolean =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0

export const useResponsive = (): ResponsiveInfo => {

  const getState = (): ResponsiveInfo => {
    const width = window.innerWidth
    const height = window.innerHeight
    const dpr = window.devicePixelRatio || 1
    const breakpoint = getBreakpoint(width)
    const orientation = getOrientation()
    const touch = isTouchDevice()

    return {
      breakpoint,
      width,
      height,
      orientation,
      isTouchDevice: touch,
      dpr,
      isMobile: ['mobile-mini', 'mobile', 'mobile-small'].includes(breakpoint),
      isTablet: breakpoint === 'tablet',
      isDesktop: breakpoint === 'desktop',
    }
  }

  const [state, setState] = useState<ResponsiveInfo>(() =>
    typeof window !== 'undefined' ? getState() : {
      breakpoint: 'desktop',
      width: 1024,
      height: 768,
      orientation: 'landscape',
      isTouchDevice: false,
      dpr: 1,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    }
  )

  useEffect(() => {
    const handler = () => setState(getState())
    window.addEventListener('resize', handler)
    window.addEventListener('orientationchange', handler)

    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
    }
  }, [])

  return state
}
