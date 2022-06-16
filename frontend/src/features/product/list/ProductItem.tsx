import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ItemCard from '../../../components/ItemCard'
import {useAppSelector, useAppDispatch} from '../../../hooks/storeHooks'
import {LocationState, Product} from '../../../types/product.types'
import ReviewList from '../../review/ReviewList'
import {productItemStyles} from './styles'
import {
  updateFavoriteItems,
  addItemToCart,
  selectSearchParams,
} from '../product.slice'
import {useSearchProductsQuery} from 'app/api'

export default function ProductItem() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const {productName} = location.state as LocationState
  const searchParams = useAppSelector(selectSearchParams)

  const product = useSearchProductsQuery<Product>(searchParams, {
    selectFromResult({data}) {
      const product = data?.products.find(
        prod => prod.name.toLowerCase() === productName.toLowerCase(),
      )
      return product ?? ({} as Product)
    },
  })
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

  if (!product) return <h1>404 Not found</h1>
  return (
    <ItemCard item={product} styles={productItemStyles}>
      <>
        <CardActions>
          <IconButton
            aria-label="Add to favorite list"
            onClick={handleAddFavoriteItem(product)}
          >
            <FavoriteIcon
              color={
                selectedFavoriteItems.includes(product.id)
                  ? 'secondary'
                  : 'inherit'
              }
            />
          </IconButton>
          <IconButton
            aria-label="Add to cart"
            onClick={handleAddItemToCart(product)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
        <div style={{marginLeft: '3%'}}>
          <Accordion defaultExpanded>
            <AccordionSummary aria-label="reviews">
              <Typography variant="h6">Reviews</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {product && product.id ? (
                <ReviewList productId={product.id} />
              ) : null}
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    </ItemCard>
  )
}
