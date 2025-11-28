import { useContext, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from './DarkMode';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MenuLinks = [
    {
        id: 1,
        name: 'Home',
        link: '/'
    },
    {
        id: 2,
        name: 'Products',
        link: '/products'
    },
    {
        id: 3,
        name: 'About',
        link: '/about'
    },
    {
        id: 4,
        name: 'Blogs',
        link: '/blogs'
    },
]
const DropdownLinks = [
    {
        id: 1,
        name: 'Trending Products',
        link: '/products?sort=trending'
    },
    {
        id: 2,
        name: 'Best Selling',
        link: '/products?sort=popular'
    },
    {
        id: 3,
        name: 'New Arrivals',
        link: '/products?sort=newest'
    },
    {
        id: 4,
        name: 'On Sale',
        link: '/products?sort=sale'
    },
]
const Navbar = ({ handleOrderPopup }) => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className='bg-white dark:bg-gray-900 dark:text-white duration-900 relative z-40'>
            <div className='py-4'>
                <div className="container flex justify-between items-center">
                    {/* logo and links section  */}
                    <div className='flex items-center gap-4'>
                        <Link to="/" className='text-primary font-[500] tracking-[.05rem] text-xl sm:text-2xl lg:text-3xl uppercase'>
                            mee-shop
                        </Link>

                        {/* Menu items - Desktop */}
                        <div className='hidden lg:block'>
                            <ul className='flex items-center gap-4'>
                                {MenuLinks.map((data, index) => (
                                    <li key={index}>
                                        <Link to={data.link}
                                            className='inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black dark:text-white '
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                                <li className='relative cursor-pointer group'>
                                    <span className='flex items-center gap-[2px] font-semibold text-gray-500 dark:text-white py-2 cursor-pointer'>
                                        Quick Links
                                        <span>
                                            <FaCaretDown className='group-hover:rotate-180 duration-300' />
                                        </span>
                                    </span>
                                    <div className='absolute z-[99999] hidden w-52 group-hover:block duration-300 rounded-md bg-white shadow-md dark:bg-gray-900 p-3 dark:text-white'>
                                        <ul className='space-y-2'>
                                            {DropdownLinks.map((data, index) => (
                                                <li key={index}>
                                                    <Link 
                                                        to={data.link}
                                                        onClick={(e) => {
                                                            if (!user) {
                                                                e.preventDefault();
                                                                navigate('/auth');
                                                            }
                                                        }}
                                                        className='text-gray-500 dark:hover:text-white hover:text-black inline-block p-2 w-full hover:bg-primary/30 rounded-md font-semibold duration-200'
                                                    >
                                                        {data.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Navbar Right Section */}
                    <div className='flex justify-between items-center gap-2 sm:gap-4'>
                        {/* search section - Desktop */}
                        <form onSubmit={handleSearch} className='relative group hidden md:block'>
                            <input 
                                type="text" 
                                placeholder='Search products...' 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='search-bar' 
                            />
                            <button type="submit">
                                <IoMdSearch className='text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 duration-200 cursor-pointer' />
                            </button>
                        </form>

                        {/* Cart Button */}
                        <button className='relative p-2 sm:p-3' onClick={() => navigate('/cart')}>
                            <FaCartShopping className='text-lg sm:text-xl text-gray-600 dark:text-gray-400' />
                            <div
                                className='w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center absolute top-0 right-0 text-xs'
                            >{cartCount}</div>
                        </button>

                        {/* auth section */}
                        <div className="hidden sm:block">
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm hidden md:inline">Hi, {user.username}</span>
                                    <button className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-primary/90 transition text-sm" onClick={logout}>Logout</button>
                                </div>
                            ) : (
                                <button className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-primary/90 transition text-sm" onClick={() => navigate('/auth')}>Login</button>
                            )}
                        </div>

                        {/* dark mode section  */}
                        <div className='hidden sm:block'>
                            <DarkMode />
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className='lg:hidden p-2'
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <div className='w-6 h-5 flex flex-col justify-between'>
                                <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className='lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800'>
                        <div className='container py-4'>
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className='relative mb-4 md:hidden'>
                                <input 
                                    type="text" 
                                    placeholder='Search products...' 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800' 
                                />
                                <button type="submit">
                                    <IoMdSearch className='text-xl text-gray-600 dark:text-gray-400 absolute top-1/2 right-3 -translate-y-1/2' />
                                </button>
                            </form>

                            {/* Mobile Menu Links */}
                            <ul className='space-y-2'>
                                {MenuLinks.map((data, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={data.link}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className='block px-4 py-2 font-semibold text-gray-500 hover:bg-primary/10 rounded dark:text-white'
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                                
                                {/* Mobile Quick Links */}
                                <li className='border-t dark:border-gray-800 pt-2 mt-2'>
                                    <span className='block px-4 py-2 font-semibold text-gray-400 text-sm'>Quick Links</span>
                                    <ul className='space-y-1 pl-4'>
                                        {DropdownLinks.map((data, index) => (
                                            <li key={index}>
                                                <Link 
                                                    to={data.link}
                                                    onClick={(e) => {
                                                        if (!user) {
                                                            e.preventDefault();
                                                            navigate('/auth');
                                                        }
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className='block px-4 py-2 text-gray-500 hover:bg-primary/10 rounded dark:text-white'
                                                >
                                                    {data.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>

                            {/* Mobile Auth & Dark Mode */}
                            <div className='flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-800'>
                                {user ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="text-sm">Hi, {user.username}</span>
                                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition text-sm" onClick={() => { logout(); setMobileMenuOpen(false); }}>Logout</button>
                                    </div>
                                ) : (
                                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition text-sm" onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}>Login</button>
                                )}
                                <DarkMode />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
