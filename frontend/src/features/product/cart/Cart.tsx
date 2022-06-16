import {useMemo, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import {SelectChangeEvent} from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import SelectField from '../../../components/SelectField'
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks'
import {
  selectCartItems,
  removeItem,
  updateItemQuantity,
  selectCartTotal,
} from '../product.slice'
import {Product} from '../../../types/product.types'
import {useNavigate} from 'react-router-dom'

export default function Cart() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectCartTotalPrice = useMemo(selectCartTotal, [])
  const {items, total} = useAppSelector(state => ({
    items: selectCartItems(state),
    total: selectCartTotalPrice(state),
  }))
  const quantities = items.reduce(
    (acc: Record<string, any>, {item, quantity}) => {
      acc[item.id] = {
        value: `${quantity}`,
      }
      return acc
    },
    {},
  )
  const [itemsQuantityValue, setItemsQuantityValue] = useState(quantities)
  const selectQuantities = Array.from(Array(10), (i, j) => ({
    value: `${j + 1}`,
    label: `${j + 1}`,
  }))

  const handleQuantityChange = (id: number) => (event: SelectChangeEvent) => {
    const {value} = event.target
    const qty = Number(value)
    setItemsQuantityValue({...itemsQuantityValue, [id]: {value}})
    if (qty > 1) {
      dispatch(updateItemQuantity({id, quantity: qty}))
    }
  }

  const handleRemoveItem =
    (item: Product) => (e: React.FormEvent<HTMLButtonElement>) => {
      dispatch(removeItem(item.id))
    }

  const handleCheckout = () => {
    navigate('/address')
  }

  if (!items.length)
    return (
      <Box
        style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}
      >
        <Typography variant="h4">Your cart is empty</Typography>
      </Box>
    )
  const cartLabel = items.length === 1 ? 'item' : 'items'
  return (
    <>
      <Typography component="div" variant="h3" style={{margin: 10}}>
        Shopping Basket
      </Typography>
      <Grid container direction="row" sx={{marginTop: 5}} spacing={4}>
        <Grid item xs={9} sx={{marginLeft: 1}}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            {items.map(({item}) => (
              <Grid item key={item.id}>
                <Card sx={{display: 'flex', marginBottom: 5}}>
                  {item ? (
                    <CardMedia
                      component="img"
                      sx={{width: 151, height: 227}}
                      image={`${item.imageUrl}&h=227&w=151`}
                      alt={item.name}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={320} height={570} />
                  )}

                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent>
                      <Typography
                        component="div"
                        variant="h5"
                        style={{marginLeft: '5%'}}
                      >
                        {item.name[0].toUpperCase() + item.name.slice(1)}
                      </Typography>
                      <Typography
                        component="div"
                        variant="h6"
                        style={{color: 'red', marginLeft: '5%'}}
                        aria-label="price"
                      >
                        ${item.price}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <SelectField
                          label="Quantity"
                          value={itemsQuantityValue[item.id].value}
                          selectValues={selectQuantities}
                          handleChange={handleQuantityChange(item.id)}
                          ariaLabel={`item-${item.id}-quantity`}
                        />
                        <Button
                          variant="text"
                          onClick={handleRemoveItem(item)}
                          aria-label={`remove-button-${item.id}`}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Box>
        </Grid>
        <Grid item xs style={{marginRight: 15}}>
          <Card>
            <CardContent>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography
                  component="span"
                  variant="h6"
                  aria-label="cart-subtotal"
                >
                  Subtotal ({items.length} {cartLabel}):{' '}
                  <strong>${total.toFixed(2)}</strong>
                </Typography>

                <Button
                  color="secondary"
                  variant="contained"
                  style={{marginTop: 10}}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
