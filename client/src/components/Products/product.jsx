
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../shared/Heading';
import ProductCard from './productCard';
import ProductCard2 from './productCard2';
import { fetchProducts } from '../../api';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    // Show only 8 products on home page
    const displayProducts = products.slice(0, 8);
    const mid = Math.ceil(displayProducts.length / 2);
    const products1 = displayProducts.slice(0, mid);
    const products2 = displayProducts.slice(mid);

    return (
        <div>
            <div className="container">
                <Heading  title="Our Products" subtitle="Explore Our Products"/>
                {loading ? <div>Loading...</div> : <>
                    <ProductCard data={products1}/>
                    <ProductCard2 data={products2} />
                    <div className="flex justify-center mt-8">
                        <Link 
                            to="/products" 
                            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:scale-105 transition-transform duration-200 font-semibold"
                        >
                            View All {products.length} Products
                        </Link>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default Product