import './App.css'
import React from 'react'
import { FaBeer } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/products/products'
import Navbar from './components/shared/NavBar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/Logln'
import PrivateRoute from './components/shared/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import AdminLayout from './components/admin/AdminLayout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'

import Sellers from './components/admin/sellers/Sellers'
import Dashboard from './components/admin/dasboard/Dashboard'
import Orders from './components/admin/orders/Orders'
import Category from './components/admin/categories/Category'
import AdminProducts from './components/admin/products/AdminProducts'



function App() {
  return (
   
    <React.Fragment>
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/about' element = {<About/>}/>
          <Route path='/contact' element = {<Contact/>}/>
          <Route path='/cart' element= {<Cart/>}/>
          
          {/* this is private Route not !Directly access type URl */}
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order-confirm' element={ <PaymentConfirmation/>}/>
          </Route>

          <Route path='/' element={<PrivateRoute publicPage/>}>
              <Route path='/login' element= {<LogIn/>}/>
              <Route path='/register' element ={<Register/>}/>
          </Route>

          {/* this is Admin Pane */}
           <Route path='/' element={<PrivateRoute adminOnly />}>
            <Route path='/admin' element={ <AdminLayout />}>
                <Route path='' element={<Dashboard />} />
                <Route path='products' element={<AdminProducts />} />
                <Route path='sellers' element={<Sellers/>} />
                <Route path='orders' element={<Orders />} />
                <Route path='categories' element={<Category/>} />
              </Route>
            </Route>
          
          {/*  */}

      </Routes>
    </Router>
    <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App

