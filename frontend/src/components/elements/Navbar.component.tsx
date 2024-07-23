import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Toolbar
} from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { Search } from "@mui/icons-material"
import { ChangeEvent } from "react"

interface INavbarProps {
  searchTerm: string
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleUpload: () => void
  file: File | null
}

function Navbar(props: INavbarProps) {
  const {
    file,
    searchTerm,
    handleFileChange,
    handleSearchChange,
    handleUpload
  } = props

  return (
    <AppBar position='static' sx={{ py: 1 }}>
      <Container maxWidth={"lg"}>
        <Toolbar>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <TextField
              variant='outlined'
              margin='normal'
              placeholder='Search your file'
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => console.log("ola")} edge='end'>
                    <Search />
                  </IconButton>
                )
              }}
              sx={{ ml: 2 }}
            />
            <Box>
              <input
                accept='.csv'
                style={{ display: "none" }}
                id='select-file'
                type='file'
                onChange={handleFileChange}
              />
              <label htmlFor='select-file'>
                <Button
                  variant='contained'
                  component='span'
                  startIcon={<UploadFileIcon />}
                >
                  Selecionar Arquivo CSV
                </Button>
              </label>

              <Button
                variant='contained'
                color='primary'
                onClick={handleUpload}
                disabled={!file}
                style={{ marginLeft: "10px" }}
              >
                Enviar Arquivo
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
