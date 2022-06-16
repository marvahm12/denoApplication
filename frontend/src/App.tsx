import {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import {PrivateRoute} from './utils/PrivateRoute'
import HomePage from './features/product/list/index'
import AppBar from './common/AppBar'
import CircularProgress from '@mui/material/CircularProgress'

const Registration = lazy(
  () => import('./features/authentication/Registration'),
)
const Login = lazy(() => import('./features/authentication/Login'))
const FavoriteProductList = lazy(
  () => import('./features/product/list/FavoriteProductList'),
)
const Cart = lazy(() => import('./features/product/cart/Cart'))
const Address = lazy(() => import('./features/product/cart/Address'))
const Payment = lazy(() => import('./features/product/cart/Payment'))
const Summary = lazy(() => import('./features/product/cart/Summary'))
const ProductItem = lazy(() => import('./features/product/list/ProductItem'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <AppBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoriteProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/products/:productName" element={<ProductItem />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Suspense>
  )
}

export default App
