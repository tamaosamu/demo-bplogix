
import ScreenLoader from "@/components/share/ScreenLoader"
// import { useLoading } from "@/hooks/useLoading"
import { useLoadingStore } from "@/stores/loading"
import { useEffect } from "react"

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isLoading = useLoadingStore((state) => state.isLoading)

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 h-full">
        <main className="relative flex-1 h-full">
          <section className="h-full p-4">{children}</section>
          <ScreenLoader fullScreen={false} loading={isLoading} />
        </main>
    </div>
  )
}
