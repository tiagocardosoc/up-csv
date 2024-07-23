import { useContext } from "react"
import { AlertContext, IAlertContextType } from "../Alert.context"

export const useAlert = (): IAlertContextType => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context
}
