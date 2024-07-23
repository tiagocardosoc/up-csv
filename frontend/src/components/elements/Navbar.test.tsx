import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import Navbar from "./Navbar.component"

const handleFileChange = vi.fn()
const handleSearchChange = vi.fn()
const handleUpload = vi.fn()

describe("Navbar Component", () => {
  test("renders Navbar correctly", () => {
    render(
      <Navbar
        searchTerm=''
        handleFileChange={handleFileChange}
        handleSearchChange={handleSearchChange}
        handleUpload={handleUpload}
        file={null}
      />
    )

    expect(screen.getByText(/Selecionar Arquivo CSV/i)).toBeInTheDocument()

    const uploadButton = screen.getByText(/Enviar Arquivo/i)
    expect(uploadButton).toBeInTheDocument()
    expect(uploadButton).toBeDisabled()

    const searchInput = screen.getByPlaceholderText(/Search your file/i)
    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: "test" } })
    expect(handleSearchChange).toHaveBeenCalled()
  })

  test("calls handleFileChange when a file is selected", () => {
    render(
      <Navbar
        searchTerm=''
        handleFileChange={handleFileChange}
        handleSearchChange={handleSearchChange}
        handleUpload={handleUpload}
        file={null}
      />
    )

    const fileInput = screen.getByLabelText(
      /Selecionar Arquivo CSV/i
    ) as HTMLInputElement
    fireEvent.change(fileInput, {
      target: { files: [new File(["dummy"], "test.csv", { type: "text/csv" })] }
    })

    expect(handleFileChange).toHaveBeenCalled()
  })

  test("calls handleUpload when the upload button is clicked", () => {
    render(
      <Navbar
        searchTerm=''
        handleFileChange={handleFileChange}
        handleSearchChange={handleSearchChange}
        handleUpload={handleUpload}
        file={new File(["dummy"], "test.csv", { type: "text/csv" })}
      />
    )

    const uploadButton = screen.getByText(/Enviar Arquivo/i)
    fireEvent.click(uploadButton)

    expect(handleUpload).toHaveBeenCalled()
  })
})
