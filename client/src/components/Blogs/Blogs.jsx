import React from 'react'
import Heading from '../shared/Heading'
import Img1 from "../../assets/blogs/blog-1.jpg";
import Img2 from "../../assets/blogs/blog-2.jpg";
import Img3 from "../../assets/blogs/blog-3.jpg";

const BlogData = [
    {
        title: "How to choose perfect smartwatch",
        subtitle:
            "Discover the key features to look for when buying a smartwatch. From battery life to fitness tracking, find the perfect match for your lifestyle and budget.",
        published: "Nov 15, 2025 by Tech Team",
        image: Img1,
        aosDelay: "0",
    },
    {
        title: "Best Gaming Laptops of 2025",
        subtitle:
            "Explore our comprehensive guide to the best gaming laptops available. Learn about GPU performance, cooling systems, and what makes a great gaming experience.",
        published: "Nov 10, 2025 by Gaming Experts",
        image: Img2,
        aosDelay: "200",
    },
    {
        title: "VR Technology: The Future is Here",
        subtitle:
            "Virtual reality has revolutionized gaming and entertainment. Learn about the latest VR headsets, immersive experiences, and what to expect in the coming years.",
        published: "Nov 5, 2025 by VR Specialists",
        image: Img3,
        aosDelay: "400",
    },
];

const Blogs = () => {
    return (
        <div className='my-8 sm:my-12'>
            <div className="container">
                <Heading title='Recent News' subtitle='Explore Our Blogs' />

                {/* blog section  */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7'>

                    {
                        BlogData.map((data) => (
                            <div key={data.title} className='bg-white dark:bg-gray-900' data-aos="fade-up"
                                data-aos-delay={data.aosDelay}>
                                {/* img section  */}
                                <div className='overflow-hidden rounded-xl sm:rounded-2xl mb-2'>
                                    <img src={data.image} alt="Loading"
                                        className='w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover hover:scale-105 rounded-xl sm:rounded-2xl duration-500'
                                    />
                                </div>

                                {/* body section  */}
                                <div className='space-y-1 sm:space-y-2'>
                                    <p className='text-xs text-gray-500'>{data.published}</p>
                                    <p className='text-sm sm:text-base font-bold line-clamp-1'>{data.title}</p>
                                    <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>{data.subtitle}</p>
                                </div>



                            </div>

                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default Blogs