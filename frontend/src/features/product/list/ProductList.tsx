import React, {useState} from 'react'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import {useAppDispatch} from '../../../hooks/storeHooks'
import {updateFavoriteItems, addItemToCart} from '../product.slice'
import {Product} from '../../../types/product.types'
import ItemCard from '../../../components/ItemCard'
import {ItemCardStyles} from './styles'
import {useNavigate} from 'react-router-dom'

interface Props {
  products: Product[]
}

export default function ProductList(props: Props) {
  const {products} = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedFavoriteItems, setSelectedFavoriteItems] = useState<number[]>(
    [],
  )

  const handleAddFavoriteItem =
    (item: Product) => (e: React.FormEvent<HTMLButtonElement>) => {
      if (selectedFavoriteItems.includes(item.id)) {
        setSelectedFavoriteItems(
          selectedFavoriteItems.filter(e => e !== item.id),
        )
      } else {
        setSelectedFavoriteItems([...selectedFavoriteItems, item.id])
      }

      dispatch(updateFavoriteItems(item))
    }

  const handleAddItemToCart =
    (item: Product) => (e: React.FormEvent<HTMLButtonElement>) => {
      dispatch(addItemToCart(item))
    }
  const handleReadMoreClick =
    (name: string) => (e: React.FormEvent<HTMLButtonElement>) => {
      navigate(`products/${name}`, {
        state: {
          productName: name,
        },
      })
    }

  return (
    <Grid
      container
      spacing={2}
      sx={{marginTop: 5}}
      justifyContent="space-around"
    >
      {products.map(item => {
        const url = item.imageUrl ? `${item.imageUrl}&h=416&w=288` : ''
        const formattedItem = Object.assign({}, item, {imageUrl: url})

        return item ? (
          <Grid item key={formattedItem.id}>
            <ItemCard item={formattedItem} styles={ItemCardStyles}>
              <CardActions>
                <IconButton
                  aria-label="more-info-button"
                  onClick={handleReadMoreClick(formattedItem.name)}
                >
                  <ReadMoreIcon />
                </IconButton>
                <IconButton
                  aria-label="add-to-favorite-list"
                  onClick={handleAddFavoriteItem(formattedItem)}
                >
                  <FavoriteIcon
                    color={
                      selectedFavoriteItems.includes(formattedItem.id)
                        ? 'secondary'
                        : 'inherit'
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="add-to-cart"
                  onClick={handleAddItemToCart(formattedItem)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </ItemCard>
          </Grid>
        ) : (
          <Box sx={{pt: 0.5}}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        )
      })}
    </Grid>
  )
}
