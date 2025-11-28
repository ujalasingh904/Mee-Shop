import React from 'react'
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
} from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Products",
    link: "/products",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];

const QuickLinks = [
  {
    title: "Shop Now",
    link: "/products",
  },
  {
    title: "Best Sellers",
    link: "/products",
  },
  {
    title: "New Arrivals",
    link: "/products",
  },
  {
    title: "Special Offers",
    link: "/products",
  },
];


const Footer = () => {
  return (
    <div className='dark:bg-gray-950'>
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details  */}
          <div className='py-8 px-4'>
            <a href="#" className='text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl'>
              MEE-SHOP
            </a>

            <p className='text-gray-600 dark:text-white/70 lg:pr-24 pt-3'>Your trusted destination for premium electronics and gadgets. We offer the latest technology products with excellent customer service and competitive prices.</p>
          </div>

          {/* footer links */}
          <div className='col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10'>
            <div className='py-8 px-4'>
              <h1 className='text-xl font-bold sm:text-left mb-3'>Important Links</h1>
              <ul className='space-y-3'>
                {
                  FooterLinks.map((data, index) => (
                    <li key={index}>
                      <a href={data.link}
                        className='text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-400 duration-300'
                      >{data.title}
                      </a>
                    </li>

                  ))
                }
              </ul>
            </div>

            <div className='py-8 px-4'>
              <h1 className='text-xl font-bold sm:text-left mb-3'>Quick Links</h1>
              <ul className='space-y-3'>
                {
                  QuickLinks.map((data, index) => (
                    <li key={index}>
                      <a href={data.link}
                        className='text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-400 duration-300'
                      >{data.title}
                      </a>
                    </li>

                  ))
                }
              </ul>
            </div>

            {/* company address  */}
            <div className='py-8 px-4 col-span-2 sm:col-auto'>
              <h1 className='text-xl font-bold sm:text-left mb-3'>Contact Us</h1>
              <div>
                <div className='flex items-center gap-3'>
                  <FaLocationArrow />
                  <p>Sector 62, Noida, UP 201301</p>
                </div>

                <div className='flex items-center gap-3 mt-6'>
                  <FaMobileAlt />
                  <p>+91 9876543210</p>
                </div>

                <div className='flex items-center mt-6 gap-3'>
                  <a href="#">
                    <FaFacebook className='text-3xl cursor-pointer hover:text-brandBlue duration-300' />

                  </a>
                  <a href="#">
                    <FaInstagram className='text-3xl cursor-pointer hover:text-primary duration-300' />

                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer