import { Backdrop, CircularProgress } from "@mui/material"
import { useLoading } from "../../context/hooks/useLoading"

function LoadingScreen() {
  const { isLoading } = useLoading()

  return isLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  ) : null
}

export default LoadingScreen
