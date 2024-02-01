import React from 'react'
import './App.css' 
import Navbar from './components/Navbar/navbar'
import { Hero } from './components/Hero/hero'
import Category from './components/category/Category'
import Category2 from './components/category/Category2'
import Services from './components/services/Services'
import Banner from './components/Banner/banner'
import headphone from "./assets/hero/headphone.png";
import Product from './components/Products/product'

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const App = () => {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'> 
      <Navbar/>
      <Hero/>
      <Category/>
      <Category2/>
      <Services/>
      <Banner  />
      <Product/>
    </div>
  )
}

export default App
