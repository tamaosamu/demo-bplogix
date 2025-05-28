import { useCallback, useState } from "react"

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const show = useCallback(() => setIsLoading(true), [])
  const hide = useCallback(() => setIsLoading(false), [])

  return { isLoading, show, hide }
}
