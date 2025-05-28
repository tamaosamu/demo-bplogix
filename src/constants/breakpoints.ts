export const breakpoints = {
  miniMobile: 320,    // iPhone SE, 12 Mini 等
  smallMobile: 375,   // iPhone X ~ 14
  oldMobile: 414,     // iPhone Plus / Pro Max
  mobile: 430,        // iPhone 15/16 Pro Max
  tablet: 768,        // iPad mini
  laptop: 1024,       // iPad Pro
  desktop: 1280,      // PC
  wide: 1536          // 5K
}

export const mediaQuery = {
  mobile: `(max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.laptop - 1}px)`,
  desktop: `(min-width: ${breakpoints.laptop}px)`
}