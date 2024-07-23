import { useContext } from "react"
import { LoadingContext, ILoadingContextType } from "../Loading.context"

export const useLoading = (): ILoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
