import React from 'react'
import brand1 from "../../assets/brand/br-1.png";
import brand2 from "../../assets/brand/br-2.png";
import brand3 from "../../assets/brand/br-3.png";
import brand4 from "../../assets/brand/br-4.png";
import brand5 from "../../assets/brand/br-5.png";


const Partners = () => {
    return (
        <div  className='py-6 sm:py-8 mt-16 sm:mt-24 hidden sm:block bg-gray-200 dark:bg-white/10'>
            <div className="container" data-aos="zoom-in" >
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-3 place-items-center opacity-50" >
                    <img src={brand1} alt="Loading" className='w-[60px] sm:w-[70px] md:w-[80px] dark:invert' />
                    <img src={brand2} alt="Loading" className='w-[60px] sm:w-[70px] md:w-[80px] dark:invert' />
                    <img src={brand3} alt="Loading" className='w-[60px] sm:w-[70px] md:w-[80px] dark:invert' />
                    <img src={brand4} alt="Loading" className='w-[60px] sm:w-[70px] md:w-[80px] dark:invert hidden sm:block' />
                    <img src={brand5} alt="Loading" className='w-[60px] sm:w-[70px] md:w-[80px] dark:invert hidden sm:block' />
                </div>
            </div>
        </div>
    )
}

export default Partners