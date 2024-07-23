import { Box, Container } from "@mui/material"
import Navbar from "../elements/Navbar.component"
import { ChangeEvent, useEffect, useState } from "react"
import FileService from "../../services/file.service"
import { useLoading } from "../../context/hooks/useLoading"
import LoadingScreen from "../elements/LoadingScreen.component"
import DisplayData from "../elements/DisplayData.component"
import { useAlert } from "../../context/hooks/useAlert"
import { IItems } from "../../interfaces/items.interface"
import { useDebounce } from "@uidotdev/usehooks"

function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [items, setItems] = useState<IItems[]>([])
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { setIsLoading, isLoading } = useLoading()
  const { showSuccess, showError } = useAlert()

  const fileService = new FileService({ setLoading: setIsLoading })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleUpload = async () => {
    if (file) {
      const response = await fileService.uploadFile(file)

      if (response.error) {
        showError(response.message)
        return
      }

      fetchSearchData()
      showSuccess(response.message)
    }
  }

  const fetchSearchData = async () => {
    const response = await fileService.searchFile(searchTerm)
    if (response.data) {
      setItems(response.data)
    }

    if (response.error) {
      showError(response.message)
    }
  }

  useEffect(() => {
    fetchSearchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <>
      <Box width={"100%"}>
        <Navbar
          searchTerm={searchTerm}
          handleFileChange={handleFileChange}
          handleSearchChange={handleSearchChange}
          handleUpload={handleUpload}
          file={file}
        />
      </Box>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <DisplayData items={items} />
        </Container>
      )}
    </>
  )
}

export default HomePage
