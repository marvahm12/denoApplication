export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface CartItem {
  item: Product
  quantity: number
}

export type AddressFormKeys =
  | 'name'
  | 'phoneNumber'
  | 'address'
  | 'zipCode'
  | 'city'
  | 'country'

export type MainPaymentCardKeys = 'cardName' | 'cardNumber' | 'securityCode'

export type PaymentCardKeys =
  | MainPaymentCardKeys
  | 'expirationYear'
  | 'expirationMonth'

export type Address = {
  [key in AddressFormKeys]: string
}

export type PaymentCard = {
  [key in PaymentCardKeys]: string | number
}

interface Value {
  value: string
  error?: boolean
  errorMessage?: string
}

export type PaymentCardFormState = Record<MainPaymentCardKeys, Value>

export interface SearchResponse {
  products: Product[]
  total: number
  offset: number
  limit: number
}

export interface SearchRequest {
  name?: string
  limit?: number
  offset?: number
}

export interface LocationState {
  searchParams: SearchRequest
  productName: string
}
