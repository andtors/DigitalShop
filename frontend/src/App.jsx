import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import './App.css'

import Navbar from './components/layouts/Navbar'
import Message from './components/layouts/Message'
import Home from './components/home/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layouts/Footer'
import ProductDetails from './components/details/ProductDetails'
import CartDetails from './components/details/CartDetails'
import OrderDetails from './components/details/OrderDetails'
import Order from './components/details/Order'
import EditUser from './components/details/EditUser'

import { UserProvider } from './context/UserContext'


function App() {
  
  return (
    <>
    <BrowserRouter>
    <UserProvider>
      <Navbar />
      <Message />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/user/cart" element={<CartDetails />}/>
      <Route path="/orders" element={<OrderDetails />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/edit" element={<EditUser />} />
    </Routes>
    <Footer />
    </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App
