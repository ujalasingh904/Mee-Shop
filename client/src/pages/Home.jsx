import { useEffect } from 'react';
import Hero from '../components/Hero/hero';
import Category from '../components/category/Category';
import Category2 from '../components/category/Category2';
import Services from '../components/services/Services';
import Banner from '../components/Banner/banner';
import Partners from '../components/Partners/Partners';
import Product from '../components/Products/product';
import Blogs from '../components/Blogs/Blogs';
import headphone from "../assets/hero/headphone.png";
import smartwatch2 from "../assets/category/smartwatch2-removebg-preview.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BannerData = {
  discount: "30% OFF",
  title: "Premium Sound",
  date: "Limited Time Offer",
  image: headphone,
  title2: "Wireless Headphones",
  title3: "Special Sale",
  title4:
    "Experience crystal-clear audio with our premium wireless headphones. Deep bass, noise cancellation, and all-day comfort.",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "25% OFF",
  title: "Smart Living",
  date: "Exclusive Deal",
  image: smartwatch2,
  title2: "Fitness Smartwatch",
  title3: "Health & Wellness",
  title4:
    "Track your fitness goals, monitor your health, and stay connected with our advanced smartwatch technology.",
  bgColor: "#2dcc6f",
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Hero />
      <Category />
      <Category2 />
      <Services />
      <Banner data={BannerData} />
      <Product />
      <Banner data={BannerData2} />
      <Blogs />
      <Partners />
    </>
  );
};

export default Home;
