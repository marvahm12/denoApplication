import Grid from '@mui/material/Grid'
import {useAppSelector} from '../../../hooks/storeHooks'
import {selectFavoriteItems} from '../product.slice'
import ItemCard from '../../../components/ItemCard'
import {ItemCardStyles} from './styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function FavoriteProductList() {
  const favoriteItems = useAppSelector(selectFavoriteItems)

  if (!favoriteItems.length) {
    return (
      <Box
        style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}
      >
        <Typography variant="h4">No favorite item found</Typography>
      </Box>
    )
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{marginTop: 5}}
      justifyContent="center"
      alignItems="center"
    >
      {favoriteItems.map(item => (
        <Grid item key={item.id}>
          <ItemCard item={item} styles={ItemCardStyles} />
        </Grid>
      ))}
    </Grid>
  )
}
