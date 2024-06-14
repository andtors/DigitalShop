import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import './App.css'

import Navbar from './components/layouts/Navbar'
import Home from './components/home/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layouts/Footer'


import { UserProvider } from './context/UserContext'
import ProductDetails from './components/details/ProductDetails'
function App() {
  
  return (
    <>
    <BrowserRouter>
    <UserProvider>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
    <Footer />
    </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App
