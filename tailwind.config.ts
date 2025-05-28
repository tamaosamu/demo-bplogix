import type { Config } from 'tailwindcss'
import { breakpoints } from './src/constants/breakpoints'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: `${breakpoints.miniMobile}px`,
        sm: `${breakpoints.smallMobile}px`,
        md: `${breakpoints.mobile}px`,
        lg: `${breakpoints.tablet}px`,
        xl: `${breakpoints.laptop}px`,
        '2xl': `${breakpoints.desktop}px`,
        '3xl': `${breakpoints.wide}px`
      }
    },
  },
  plugins: [],
}

export default config