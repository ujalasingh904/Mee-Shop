import Img1 from "../assets/blogs/blog-1.jpg";
import Img2 from "../assets/blogs/blog-2.jpg";
import Img3 from "../assets/blogs/blog-3.jpg";

const BlogsData = [
    {
        id: 1,
        title: "How to Choose the Perfect Smartwatch in 2025",
        subtitle: "Discover the key features to look for when buying a smartwatch. From battery life to fitness tracking, find the perfect match for your lifestyle and budget.",
        published: "Nov 15, 2025",
        author: "Tech Team",
        image: Img1,
        content: `Smartwatches have become an essential accessory for tech enthusiasts and fitness lovers alike. With so many options available in the market, choosing the right one can be overwhelming. Here's a comprehensive guide to help you make an informed decision.

**Key Features to Consider:**

1. **Battery Life**: Look for watches that offer at least 2-3 days of battery life with regular use. Some models offer extended battery modes that can last up to a week.

2. **Fitness Tracking**: If health and fitness are your priorities, ensure the watch has accurate heart rate monitoring, GPS, sleep tracking, and multiple workout modes.

3. **Compatibility**: Check if the smartwatch is compatible with your smartphone's operating system (iOS or Android).

4. **Display Quality**: AMOLED displays offer vibrant colors and better battery efficiency compared to LCD screens.

5. **Water Resistance**: Essential if you plan to wear it while swimming or in rainy conditions.

**Budget Considerations:**

- Entry-level: ₹3,000 - ₹8,000 (Basic features, good for beginners)
- Mid-range: ₹8,000 - ₹25,000 (Advanced features, premium build)
- Premium: ₹25,000+ (All features, luxury brands)

**Top Recommendations for 2025:**

- Best Overall: Apple Watch Series 9
- Best Android: Samsung Galaxy Watch 6
- Best Budget: Amazfit GTS 4
- Best Fitness: Garmin Forerunner 265`,
        aosDelay: "0",
    },
    {
        id: 2,
        title: "Best Gaming Laptops of 2025: Complete Buyer's Guide",
        subtitle: "Explore our comprehensive guide to the best gaming laptops available. Learn about GPU performance, cooling systems, and what makes a great gaming experience.",
        published: "Nov 10, 2025",
        author: "Gaming Experts",
        image: Img2,
        content: `Gaming laptops have evolved tremendously, offering desktop-level performance in portable form factors. Whether you're a casual gamer or an esports enthusiast, here's everything you need to know.

**Essential Components:**

1. **GPU (Graphics Card)**: The most critical component for gaming. Look for at least RTX 4060 for 1080p gaming, RTX 4070 for 1440p, and RTX 4080+ for 4K gaming.

2. **Processor**: Modern gaming requires at least an Intel Core i7 or AMD Ryzen 7 processor for optimal performance.

3. **RAM**: 16GB is the minimum, but 32GB is recommended for future-proofing and multitasking.

4. **Display**: 
   - Refresh Rate: 144Hz minimum, 240Hz for competitive gaming
   - Resolution: 1080p for esports, 1440p for balanced gaming
   - Response Time: 3ms or lower

5. **Cooling System**: Advanced thermal management is crucial for sustained performance.

**Performance Tiers:**

- Entry Gaming: ₹60,000 - ₹80,000 (1080p, Medium-High settings)
- Mid-Range Gaming: ₹80,000 - ₹1,50,000 (1440p, High-Ultra settings)
- High-End Gaming: ₹1,50,000+ (4K, Ultra settings, Ray Tracing)

**Top Picks for 2025:**

1. ASUS ROG Strix G16 - Best Overall
2. MSI Katana 15 - Best Value
3. Lenovo Legion Pro 7 - Best Performance
4. Acer Predator Helios 16 - Best Cooling`,
        aosDelay: "200",
    },
    {
        id: 3,
        title: "VR Technology: The Future of Gaming and Entertainment",
        subtitle: "Virtual reality has revolutionized gaming and entertainment. Learn about the latest VR headsets, immersive experiences, and what to expect in the coming years.",
        published: "Nov 5, 2025",
        author: "VR Specialists",
        image: Img3,
        content: `Virtual Reality technology has made significant strides in recent years, transforming from a niche technology to a mainstream entertainment platform.

**Current State of VR:**

The VR market in 2025 offers unprecedented levels of immersion with improved resolution, wider field of view, and better tracking systems. Standalone headsets have eliminated the need for powerful PCs for many experiences.

**Types of VR Headsets:**

1. **Standalone VR**:
   - Meta Quest 3 - Best all-rounder
   - Pico 4 - Great value
   - No PC required, wireless freedom

2. **PC VR**:
   - Valve Index - Best for enthusiasts
   - HP Reverb G2 - Best clarity
   - Requires powerful gaming PC

3. **Console VR**:
   - PlayStation VR2 - Exclusive games
   - Works with PS5 only

**Popular VR Applications:**

1. **Gaming**: From action-packed shooters to relaxing exploration games
2. **Fitness**: VR workouts burn real calories while having fun
3. **Social**: Virtual hangouts and events
4. **Education**: Immersive learning experiences
5. **Work**: Virtual offices and collaboration

**Getting Started with VR:**

- Budget: ₹25,000 - ₹40,000 (Entry-level standalone)
- Mid-Range: ₹40,000 - ₹70,000 (Premium standalone)
- High-End: ₹70,000+ (PC VR setups)

**Must-Try VR Games:**

- Beat Saber (Rhythm game)
- Half-Life: Alyx (Story-driven)
- Resident Evil Village VR (Horror)
- Meta Horizon Worlds (Social)

**The Future:**

Mixed Reality (MR) is the next frontier, blending virtual and real worlds. Apple Vision Pro has set new standards, and competition is heating up with more affordable MR devices expected in 2026.`,
        aosDelay: "400",
    },
];

const BlogPage = () => {
    return (
        <div className="flex-1">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">Tech Insights & News</h1>
                    <p className="text-lg md:text-xl max-w-3xl" data-aos="fade-up" data-aos-delay="200">
                        Stay updated with the latest trends, reviews, and buying guides in the world of technology.
                    </p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="container py-16">
                <div className="space-y-16">
                    {BlogsData.map((blog, index) => (
                        <div 
                            key={blog.id} 
                            className={`grid md:grid-cols-2 gap-8 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            data-aos="fade-up"
                        >
                            <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <span>{blog.published}</span>
                                    <span>•</span>
                                    <span>By {blog.author}</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4 hover:text-primary transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {blog.subtitle}
                                </p>
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line line-clamp-6">
                                        {blog.content}
                                    </div>
                                </div>
                                <button className="mt-6 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                                    Read Full Article
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Subscribe to Our Newsletter</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Get the latest tech news, product reviews, and exclusive deals delivered to your inbox.
                    </p>
                    <div className="max-w-md mx-auto" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none"
                            />
                            <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
