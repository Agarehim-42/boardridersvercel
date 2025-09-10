import "./App.css";
import "flowbite";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Səhifələr
import Home from "./pages/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import Clothes from "./pages/Clothes";
import ContactPage from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";

import Wishlist from "./components/FavoriteButton";
import { ShoppingCart } from "lucide-react";
import ShoppingCard from "./components/ShoppingCard";
import SearchResults from './components/SearchResults'
import AddProducts from "./components/admin/AddProducts";
import AdminProducts from "./components/admin/AdminProducts";
import EditProduct from "./components/admin/EditProduct";
import EcommerceApp from "./components/EcommerceApp";
import Kisi from "./components/Kisi";

import Qadin from "./components/Qadin";
import ResetPassword from "./components/ResetPassword";

import PrivateRoute from './components/PrivateRoute'
import Blogs from "./components/Blogs";

import AdminBlog from "./components/admin/AdminBlog";
import AddBlogs from "./components/admin/AddBlogs";
import { ToastContainer } from "react-toastify";
import Usaq from "./components/Usaq";




  


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/password/reset/token/:token" element={<ResetPassword />} />

          <Route path="/clothes" element={<Clothes />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/favorites" element={<Wishlist />} />
          <Route path="/shoppingcard" element={<ShoppingCard />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/blogs" element={<Blogs />} />
          
    
<Route path='/admin/add-products' element={<PrivateRoute>
        <AddProducts />
      </PrivateRoute>} />
      
      <Route path='/admin/adminproducts' element={<PrivateRoute>
        <AdminProducts />
      </PrivateRoute>} />
      <Route path='/admin/edit-product/:id' element={
        <PrivateRoute>
          <EditProduct />
        </PrivateRoute>
      } />
      

      <Route path='/admin/admin-blogs' element={
        <PrivateRoute>
          <AdminBlog />
        </PrivateRoute>
      } />

      <Route path='/admin/add-blog' element={
        <PrivateRoute>
          <AddBlogs />
        </PrivateRoute>
      } />

          <Route path="/Ecommerceapp" element={<EcommerceApp />} />
          <Route path="/kisi" element={<Kisi />} />
          <Route path="/qadin" element={<Qadin />} />
          <Route path="/usaq" element={<Usaq />} />
         
     
 


          
          
          
          
        </Routes>
       
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
