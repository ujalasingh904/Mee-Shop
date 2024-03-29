import React, { useEffect, useState } from 'react'
import './App.css' 
import Navbar from './components/Navbar/navbar'
import  Hero  from './components/Hero/hero'
import Category from './components/category/Category'
import Category2 from './components/category/Category2'
import Services from './components/services/Services'
import Banner from './components/Banner/banner'
import Partners from './components/Partners/Partners'
import Footer from './components/Footer/Footer'
import headphone from "./assets/hero/headphone.png";
import Product from './components/Products/product'
import smartwatch2 from "./assets/category/smartwatch2-removebg-preview.png";
import Blogs from './components/Blogs/Blogs'
import Popup from './components/Popup/popup'
import AOS from 'aos';
import "aos/dist/aos.css"

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

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: smartwatch2,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

const App = () => {
  const [OrderPopup, setOrderPopup] = useState(false)
  
  const handleOrderPopup = ()=>{ 
    setOrderPopup(!OrderPopup);
  }
 
  useEffect(() => {
    AOS.init(
      {
        duration:800,
        easing:"ease-in-sine",
        delay:100,
        offset:100,
      });
      AOS.refresh();
  },[])

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'> 
      <Navbar handleOrderPopup={handleOrderPopup}/>
      <Hero handleOrderPopup={handleOrderPopup}/>
      <Category/>
      <Category2/>
      <Services/>
      <Banner data={BannerData} />
      <Product/> 
      <Banner data={BannerData2} />
      <Blogs />
      <Partners />
      <Footer/>
      <Popup OrderPopup={OrderPopup} handleOrderPopup={handleOrderPopup}/>
    </div>
  )
}

export default App
