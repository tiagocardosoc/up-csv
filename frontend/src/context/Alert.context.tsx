import { createContext, useState, ReactNode } from "react"
import { Snackbar, Alert } from "@mui/material"

export interface IAlertContextType {
  showSuccess: (message: string) => void
  showError: (message: string) => void
}

export const AlertContext = createContext<IAlertContextType | undefined>(
  undefined
)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const showSuccess = (message: string) => {
    setAlert({ type: "success", message })
    setTimeout(() => setAlert(null), 3000)
  }

  const showError = (message: string) => {
    setAlert({ type: "error", message })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <AlertContext.Provider value={{ showSuccess, showError }}>
      {children}
      {alert && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setAlert(null)}
        >
          <Alert
            variant='filled'
            onClose={() => setAlert(null)}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </AlertContext.Provider>
  )
}
