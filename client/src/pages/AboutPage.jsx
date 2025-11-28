import { FaShippingFast, FaHeadset, FaShieldAlt, FaAward } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="flex-1">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">About Mee-Shop</h1>
                    <p className="text-lg md:text-xl max-w-3xl" data-aos="fade-up" data-aos-delay="200">
                        Your trusted destination for premium electronics and cutting-edge technology products since 2020.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="container py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Founded in 2020, Mee-Shop started with a simple vision: to make the latest technology accessible to everyone. 
                            What began as a small online store has grown into a trusted e-commerce platform serving thousands of customers across India.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            We specialize in providing high-quality electronics, from smartphones and laptops to gaming accessories and smart home devices. 
                            Our commitment to quality, affordability, and customer satisfaction has made us a preferred choice for tech enthusiasts.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Today, we continue to expand our product range and improve our services, always keeping our customers at the heart of everything we do.
                        </p>
                    </div>
                    <div data-aos="fade-left">
                        <img 
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80" 
                            alt="About Us" 
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="bg-gray-100 dark:bg-gray-800 py-16">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Why Choose Us</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center" data-aos="fade-up" data-aos-delay="0">
                            <div className="flex justify-center mb-4">
                                <FaShippingFast className="text-6xl text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Quick and reliable shipping to your doorstep with real-time tracking.
                            </p>
                        </div>
                        <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                            <div className="flex justify-center mb-4">
                                <FaShieldAlt className="text-6xl text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                100% secure transactions with multiple payment options available.
                            </p>
                        </div>
                        <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                            <div className="flex justify-center mb-4">
                                <FaAward className="text-6xl text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                All products are 100% authentic with manufacturer warranty.
                            </p>
                        </div>
                        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex justify-center mb-4">
                                <FaHeadset className="text-6xl text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Dedicated customer support team ready to help you anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="container py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-primary/10 dark:bg-primary/20 p-8 rounded-lg" data-aos="fade-up">
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            To provide customers with access to the latest technology products at competitive prices, 
                            backed by exceptional customer service and a seamless shopping experience. We strive to be 
                            the go-to destination for all your electronic needs.
                        </p>
                    </div>
                    <div className="bg-secondary/10 dark:bg-secondary/20 p-8 rounded-lg" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            To become India&apos;s most trusted and innovative e-commerce platform for electronics, 
                            where technology meets convenience. We envision a future where everyone has access to 
                            cutting-edge technology that enhances their daily lives.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
                <div className="container">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div data-aos="zoom-in" data-aos-delay="0">
                            <h3 className="text-4xl font-bold mb-2">10K+</h3>
                            <p className="text-lg">Happy Customers</p>
                        </div>
                        <div data-aos="zoom-in" data-aos-delay="100">
                            <h3 className="text-4xl font-bold mb-2">500+</h3>
                            <p className="text-lg">Products</p>
                        </div>
                        <div data-aos="zoom-in" data-aos-delay="200">
                            <h3 className="text-4xl font-bold mb-2">50+</h3>
                            <p className="text-lg">Brands</p>
                        </div>
                        <div data-aos="zoom-in" data-aos-delay="300">
                            <h3 className="text-4xl font-bold mb-2">99%</h3>
                            <p className="text-lg">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
