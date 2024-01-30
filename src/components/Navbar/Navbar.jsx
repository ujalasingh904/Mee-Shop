import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6"; 
import DarkMode from './DarkMode';

const MenuLinks = [
    {
        id: 1,
        name: 'Home',
        link: '/#'
    },
    {
        id: 2,
        name: 'Shop',
        link: '/#shop'
    },
    {
        id: 3,
        name: 'About',
        link: '/#about'
    },
    {
        id: 4,
        name: 'Blogs',
        link: '/#blog'
    },
]
const DropdownLinks = [
    {
        id: 1,
        name: 'Trending Products',
        link: '/#'
    },
    {
        id: 2,
        name: 'Best selling',
        link: '/#'
    },
    {
        id: 3,
        name: 'Top Rated',
        link: '/#t'
    },
    {
        id: 4,
        name: 'Most buyed',
        link: '/#'
    },
]
const Navbar = () => {
    return (
        <div className='bg-white dark:bg-gray-900 dark:text-white duration-900   relative z-40 '>
            <div className='py-4'>
                <div className="container flex justify-between items-center">
                    {/* logo and links section  */}
                    <div className='flex items-center gap-4'>
                        <a href="#" className='text-primary font-[500] tracking-[.05rem] text-2xl sm:text-3xl uppercase'>
                            mee-shop
                        </a>

                        {/* Menu items  */}
                        <div className=' lg:block'>
                            <ul className='flex items-center gap-4'>
                                {
                                    MenuLinks.map((data, index) => (
                                        <li key={index}>
                                            <a href={data.link}
                                                className='inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black dark:text-white '
                                            >

                                                {data.name}
                                            </a>
                                        </li>

                                    ))
                                }
                                <li className='relative cursor-pointer group'>
                                    <a href="#"
                                        className='flex items-center gap-[2px] font-semibold text-gray-500 dark:text-white py-2'

                                    >
                                        Quick Links
                                        <span>
                                            <FaCaretDown 
                                              className='group-hover:rotate-180 duration-300'
                                            />
                                        </span>
                                    </a>

                                    <div className='absolute z-[99999] hidden w-52 group-hover:block duration-300 rounded-md bg-white shadow-md dark:bg-gray-900 p-3 dark:text-white'>
                                        <ul className='space-y-2'>
                                            {
                                                DropdownLinks.map((data,index)=>(
                                                    <li key={index}
                                                    >
                                                        <a href={data.link}
                                                          className='text-gray-500
                                                          dark:hover:text-white hover:text-black 
                                                          inline-block p-2 w-full hover:bg-primary/30 
                                                          rounded-md font-semibold
                                                          duration-200'
                                                        >
                                                            {data.name}</a>
                                                    </li>
 
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Navbar Right Section */} 
                    <div className='flex justify-between items-center gap-4'>
                        {/* search section  */}
                        <div className='relative group hidden sm:block'>
                            <input type="text" placeholder='search' className='search-bar ' />
                            <IoMdSearch className='text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 duration-200' />
                        </div>

                        <button className='relative p-3'>
                            <FaCartShopping className='text-xl text-gray-600 dark:text-gray-400' />
                            <div
                                className='w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center absolute top-0 right-0 text-xs'
                            >4</div>
                        </button>

                        {/* dark mode section  */}
                        <div>
                            <DarkMode/>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
