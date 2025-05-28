import { AnimatePresence } from "framer-motion"
import { Spinner } from "../animate/Spinner"
import { SpinnerText } from "../animate/SpinnerText"
import { Backdrop } from "./Backdrop"

const text = "Loading..."

interface ScreenLoaderProps {
  fullScreen?: boolean // true: fixed全屏，false: absolute覆盖父容器
  loading?: boolean
}

export default function ScreenLoader({
  fullScreen = true,
  loading = true,
}: ScreenLoaderProps) {
  if (!loading) return null // 👈 控制显示/隐藏
  return (
    <Backdrop fullScreen={fullScreen}>
      <AnimatePresence key="spinner">
        {/* Apple 风格菊花动画 */}
        <Spinner key="spinner-icon" />
        <SpinnerText key="spinner-text" content={text} />
      </AnimatePresence>
    </Backdrop>
  )
}
