import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {
  CartItem,
  Product,
  Address,
  PaymentCard,
  SearchRequest,
} from '../../types/product.types'
// import {selectProductList} from '../../app/api'

interface InitialState {
  cartItems: CartItem[]
  favoriteItems: Product[]
  address: Address
  paymentCard: PaymentCard
  searchParams: SearchRequest
}
const initialState: InitialState = {
  favoriteItems: [],
  cartItems: [],
  address: {} as Address,
  paymentCard: {} as PaymentCard,
  searchParams: {
    limit: 10,
    offset: 0,
    name: '',
  },
}

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    addItemToCart: (state, {payload: item}: PayloadAction<Product>) => {
      const itemIndex = state.cartItems.findIndex(e => e.item.id === item.id)
      if (itemIndex === -1) {
        state.cartItems.push({item, quantity: 1})
      }
    },
    updateFavoriteItems: (state, {payload: item}: PayloadAction<Product>) => {
      const foundItem = state.favoriteItems.find(e => e.id === item.id)
      if (foundItem) {
        state.favoriteItems = state.favoriteItems.filter(e => e.id !== item.id)
      } else {
        state.favoriteItems.push(item)
      }
    },
    removeItem: (state, {payload: id}: PayloadAction<number>) => {
      const foundItem = state.cartItems.find(e => e.item.id === id)
      if (foundItem) {
        state.cartItems = state.cartItems.filter(e => e.item.id !== id)
      }
    },
    updateItemQuantity: (
      state,
      {payload: {id, quantity}}: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const itemIndex = state.cartItems.findIndex(e => e.item.id === id)
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = quantity
      }
    },
    addShippingAddress: (state, {payload: address}: PayloadAction<Address>) => {
      state.address = address
    },
    addPaymentCard: (
      state,
      {payload: paymentCard}: PayloadAction<PaymentCard>,
    ) => {
      state.paymentCard = paymentCard
    },
    resetCart: state => {
      state.cartItems = []
    },
    updateSearchParams: (state, {payload}: PayloadAction<SearchRequest>) => {
      state.searchParams = payload
    },
  },
})

export const {
  addItemToCart,
  updateFavoriteItems,
  removeItem,
  updateItemQuantity,
  addShippingAddress,
  addPaymentCard,
  resetCart,
  updateSearchParams,
} = productSlice.actions

export default productSlice.reducer

export const selectFavoriteItems = (state: RootState): Product[] =>
  state.product.favoriteItems
export const selectCartItems = (state: RootState): CartItem[] =>
  state.product.cartItems
export const selectCartTotal = () =>
  createSelector(
    (state: RootState) => state.product.cartItems,
    (cartIems: CartItem[]) =>
      cartIems.reduce((total: number, cartItem) => {
        total += cartItem.item.price * cartItem.quantity
        return total
      }, 0),
  )
export const selectShippmentAddress = () =>
  createSelector(
    (state: RootState) => state.product.address,
    address => {
      if (Object.keys(address).length) {
        return `${address.name}, ${address.address}, ${address.city}, ${address.zipCode}, ${address.country}`
      }
      return ''
    },
  )

export const selectSearchParams = (state: RootState): SearchRequest =>
  state.product.searchParams
