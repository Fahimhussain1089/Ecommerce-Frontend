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


function App() {
  return (
    // < >
    //   <Products/>
    // </>
    <React.Fragment>
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/about' element = {<About/>}/>
          <Route path='/contact' element = {<Contact/>}/>
          {/* <Route path='/cart' element = {<cart/>}/> */}
          <Route path='/cart' element= {<Cart/>}/>
      </Routes>
    </Router>
    <Toaster position='top-center'/>
    </React.Fragment>
  )
}

export default App

