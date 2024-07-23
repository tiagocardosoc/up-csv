// import { render, screen } from "@testing-library/react"
// import Navbar from "../components/elements/Navbar.component"
import { render } from "@testing-library/react"
import App from "../App"
import "@testing-library/jest-dom"

// const mockProps = {
//   searchTerm: "",
//   handleFileChange: jest.fn(),
//   handleSearchChange: jest.fn(),
//   handleUpload: jest.fn(),
//   file: null
// }

// describe("Navbar", () => {
//   it("Should render the Navbar", () => {
//     render(<Navbar {...mockProps} />)

//     expect(screen.getByPlaceholderText("Search")).toBeInTheDocument()
//     expect(screen.getByLabelText("Upload CSV")).toBeInTheDocument()
//     expect(screen.getByText("Upload CSV")).toBeInTheDocument()
//   })
// })

test("demo", () => {
  expect(true).toBe(true)
})

test("Renders the main page", () => {
  render(<App />)
  expect(true).toBeTruthy()
})
