import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoadingScreen from "./LoadingScreen.component"
import { LoadingContext } from "../../context/Loading.context"

const renderWithLoadingContext = (isLoading: boolean) => {
  return render(
    <LoadingContext.Provider value={{ isLoading, setIsLoading: () => {} }}>
      <LoadingScreen />
    </LoadingContext.Provider>
  )
}

describe("LoadingScreen", () => {
  it("should show CircularProgress when isLoading is true", () => {
    renderWithLoadingContext(true)
    expect(screen.getByTestId("spinner-loading")).toBeInTheDocument()
  })

  it("should not show CircularProgress when isLoading is false", () => {
    renderWithLoadingContext(false)
    expect(screen.queryByTestId("spinner-loading")).not.toBeInTheDocument()
  })
})
