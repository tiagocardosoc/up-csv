import React, { createContext, useState } from "react"
import { IAppProviderProps } from "../interfaces/app.interface"

export interface ILoadingContextType {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<ILoadingContextType | undefined>(
  undefined
)

export const LoadingProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
