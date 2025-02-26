import React from 'react'
import Products from '../components/Products.jsx'
import Abzor from '../components/Abzor.jsx'
import Introduction from '../components/Introduction.jsx'
import Reklam from '../components/Reklam.jsx'
import Collection from '../components/Collection.jsx'
import Footer from '../components/Footer.jsx'
import Woman from '../components/Woman.jsx'
import Wishlist from '../components/FavoriteButton.jsx'
import Mix from '../components/Mix.jsx'
import DiscountTimer from '../components/DiscountTimer.jsx'
import Navbar from '../components/Navbar.jsx'
import Navbar1 from '../components/Navbar1.jsx'
import Clothes from './Clothes.jsx'
import NewArrivals from '../components/NewArrivals.jsx'
import ChatWidget from './Widget.jsx'



const Home = () => {
  return (
    <div>
      {/* <Products/> */}
      {/* <Navbar1/> */}
      <Navbar/>
      <Abzor />
      <Reklam />
      <Woman />
      <Introduction />
      <Collection />
      <Mix/>
      
      <Products/>
      
      <ChatWidget/>


    </div>
  )
}

export default Home
