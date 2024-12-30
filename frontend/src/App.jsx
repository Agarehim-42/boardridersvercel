
import './App.css'
import 'flowbite'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

import {BrowserRouter , Routes , Route } from 'react-router-dom'


// Sehifeler komponenti 
import Home from './pages/Home'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import Register from './components/Register'
import ProductDetail from './components/ProductDetail'
function App() {

  return (
    <>
  <BrowserRouter>
  <Toaster position='top-center'/>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/product/:id' element={<ProductDetail/>} />
  </Routes>

  </BrowserRouter>
    </>
  )
}

export default App
