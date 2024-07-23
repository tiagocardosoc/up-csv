import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import HomePage from "./components/home"
import { LoadingProvider } from "./context/Loading.context"
import { AlertProvider } from "./context/Alert.context"

function App() {
  return (
    <>
      <AlertProvider>
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </AlertProvider>
    </>
  )
}

export default App
