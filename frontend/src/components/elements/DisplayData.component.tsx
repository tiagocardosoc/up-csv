import { Box, Grid, Typography } from "@mui/material"
import { IItems } from "../../interfaces/items.interface"
import CardItems from "./CardItems.component"

interface IDisplayDataProps {
  items: IItems[]
}

function DisplayData(props: IDisplayDataProps) {
  const { items } = props

  return (
    <>
      {!items.length ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"80vh"}
        >
          <Typography variant='h5'>No display data</Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={1}
          paddingY={5}
          justifyContent={"space-evenly"}
          xs={12}
        >
          {items.map((item: IItems, index: number) => {
            return (
              <Grid item xs={4} key={index}>
                <CardItems item={item} key={index} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default DisplayData
