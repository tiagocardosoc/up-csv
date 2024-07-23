import { IItems } from "../../interfaces/items.interface"
import DisplayData from "./DisplayData.component"
import { render, screen } from "@testing-library/react"

describe("DisplayData Component", () => {
  test('displays "No display data" message when items array is empty', () => {
    render(<DisplayData items={[]} />)

    expect(screen.getByText(/No display data/i)).toBeInTheDocument()
  })

  test("renders items correctly when items array has data", () => {
    const mockItems: IItems[] = [
      {
        name: "Item 1",
        city: "City 1",
        country: "Country 1",
        favorite_sport: "Sport 1"
      },
      {
        name: "Item 2",
        city: "City 2",
        country: "Country 2",
        favorite_sport: "Sport 2"
      },
      {
        name: "Item 3",
        city: "City 3",
        country: "Country 3",
        favorite_sport: "Sport 3"
      },
      {
        name: "Item 4",
        city: "City 4",
        country: "Country 4",
        favorite_sport: "Sport 4"
      }
    ]

    render(<DisplayData items={mockItems} />)

    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(
        screen.getByText(`${item.city} - ${item.country}`)
      ).toBeInTheDocument()
      expect(screen.getByText(item.favorite_sport)).toBeInTheDocument()
    })
  })
})
