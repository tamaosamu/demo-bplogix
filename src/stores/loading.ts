// stores/loading.ts
import { create } from "zustand"

type LoadingStore = {
  isLoading: boolean
  show: () => void
  hide: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  show: () => set({ isLoading: true }),
  hide: () => set({ isLoading: false }),
}))
