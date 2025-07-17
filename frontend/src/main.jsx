import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
// import { Home, Products, Cart } from './components/index.jsx
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import SingleProductView from './components/SingleProductView.jsx'
import Checkout from './components/Checkout.jsx'
import SignUp from './components/SignUp.jsx'
import Card from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import SearchView from './components/SearchView.jsx'
import PaymentSuccess from './components/PaymentSuccess.jsx'
import { CartProvider } from './context/CartContent.jsx'
import { SearchProvider } from './context/searchContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Card />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='profile' element={<Profile />} />
      <Route path='products' element={<Products />} />
      <Route path='cart' element={<Cart />} />
      <Route path='products/:id' element={<SingleProductView />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='search' element={<SearchView />} />
      <Route path='payment-success' element={<PaymentSuccess />} />
    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
