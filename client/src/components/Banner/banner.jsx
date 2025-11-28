import React from 'react'
import headphone from "../../assets/hero/headphone.png";




const Banner = ({ data }) => {
    return (
        <div className='min-h-[400px] sm:min-h-[500px] md:min-h-[550px] flex justify-center items-center py-8 sm:py-12'>
            <div className='container'>
                <div style={{ backgroundColor: data.bgColor }} className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center text-white rounded-2xl sm:rounded-3xl'>
                    {/* first col */}
                    <div className='p-4 sm:p-6 md:p-8'>
                        <p data-aos="slide-right" className='text-xs sm:text-sm'>{data.discount}</p>
                        <h1 data-aos="zoom-out" className='uppercase text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold my-2'>{" "} {data.title}</h1>
                        <p data-aos="fade-up" className='text-xs sm:text-sm'>{data.date}</p>
                    </div>

                    {/* second col */}
                    <div className='h-full flex items-center py-4 md:py-0'
                        data-aos="zoom-in"
                    >
                        <img src={data.image} alt="Loading"
                            className='scale-110 sm:scale-125 w-[180px] sm:w-[220px] md:w-[300px] lg:w-[340px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover'
                        />
                    </div>

                    {/* third col */}
                    <div className='flex flex-col justify-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8'>
                        <p data-aos="zoom-out" className='font-bold text-base sm:text-lg lg:text-xl'>{data.title2}</p>
                        <p data-aos="fade-up" className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{data.title3}</p>
                        <p data-aos="fade-up" className='text-xs sm:text-sm tracking-wide leading-5'>{data.title4}</p>
                        <div data-aos="fade-up" data-aos-offset="0">
                            <button style={{ color: data.bgColor }} className='bg-white py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-full hover:scale-105 transition-transform'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
} 

export default Banner