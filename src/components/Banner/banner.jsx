import React from 'react'
import headphone from "../../assets/hero/headphone.png";

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


const Banner = () => {
    return (
        <div className='min-h-[550px]  flex justify-center items-center py-12'>
            <div className='container'>
                <div style={{backgroundColor:BannerData.bgColor}} className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl'>
                    {/* first col */}
                    <div className='p-6 sm:p-8'>
                        <p className='text-sm'>{BannerData.discount}</p>
                        <h1 className='uppercase text-4xl lg:text-7xl font-bold'>{" "} {BannerData.title}</h1>
                        <p className='text-sm'>{BannerData.date}</p>
                    </div>

                    {/* second col */}
                    <div className='h-full flex items-center'>
                        <img src={BannerData.image} alt="Loading" 
                             className='scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover'
                        />
                    </div>
 
                    {/* third col */}
                    <div className='flex flex-col justify-center gap-4 p-6 sm:p-8'>
                        <p className='font-bold text-xl'>{BannerData.title2}</p>
                        <p className='text-3xl sm:text-5xl font-bold'>{BannerData.title3}</p>
                        <p className='text-sm tracking-wide leading-5'>{BannerData.title4}</p>
                        <div>
                            <button style={{color:BannerData.bgColor}} className='bg-white py-2 px-4 rounded-full'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner