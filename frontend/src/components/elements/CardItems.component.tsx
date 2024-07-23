import { Box, Typography } from "@mui/material"
import { IItems } from "../../interfaces/items.interface"

interface ICardItemProps {
  item: IItems
}

function CardItems(props: ICardItemProps) {
  const { item } = props

  return (
    <Box border={"solid 1px"} borderRadius={"15px"} padding={2}>
      <Typography>{item.name}</Typography>
      <Typography>
        {item.city} - {item.country}
      </Typography>
      <Typography>{item.favorite_sport}</Typography>
    </Box>
  )
}

export default CardItems
