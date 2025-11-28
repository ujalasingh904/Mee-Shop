import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const loadProduct = useCallback(async () => {
    try {
      const data = await fetchProduct(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/cart');
    }
  };

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-2xl dark:text-white">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-6 sm:pb-10 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <FiArrowLeft />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-primary font-semibold mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{product.name}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400 text-xs sm:text-sm">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 text-xs sm:text-sm">Out of Stock</span>
              )}
            </div>

            <div className="border-t border-b dark:border-gray-700 py-4 sm:py-6 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Quantity</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center border dark:border-gray-700 rounded-lg">
                  <button
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 sm:px-6 py-2 border-l border-r dark:border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    disabled={quantity >= product.stock}
                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Max: {product.stock} units
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FiShoppingCart className="text-xl sm:text-2xl" />
              <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            {/* Additional Info */}
            <div className="mt-6 sm:mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold mb-3">Product Information</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex justify-between">
                  <span>Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </li>
                <li className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-medium">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
