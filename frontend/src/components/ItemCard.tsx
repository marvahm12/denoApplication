import {SxProps} from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import {Product} from '../types/product.types'

interface Props {
  item: Product
  children?: React.ReactNode
  styles: {
    cardWrapper: SxProps
    cardMedia: SxProps
    name?: SxProps
  }
}

export default function ItemCard(props: Props) {
  const {item, children, styles} = props
  let content = null
  if (children) content = children
  return (
    <Card sx={styles.cardWrapper}>
      {item ? (
        <CardMedia
          component="img"
          sx={styles.cardMedia}
          image={item.imageUrl}
          alt={item.name}
        />
      ) : (
        <Skeleton variant="rectangular" sx={styles.cardWrapper} />
      )}
      <Box sx={{width: '40%'}}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={styles.name}
          >
            {item.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {item.price} $
          </Typography>
        </CardContent>
        {content}
      </Box>
    </Card>
  )
}
