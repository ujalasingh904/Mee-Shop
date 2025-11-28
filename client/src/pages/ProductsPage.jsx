import { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { FiShoppingCart, FiSearch, FiPlus, FiMinus } from 'react-icons/fi';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const { addToCart, cart, removeFromCart, updateQty } = useCart();

  // Get quantity in cart for a product
  const getCartQuantity = (productId) => {
    const item = cart.find(c => c.id === productId);
    return item ? item.qty : 0;
  };

  const handleIncrement = (product) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  const handleDecrement = (productId) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const qty = getCartQuantity(productId);
    if (qty === 1) {
      removeFromCart(productId);
    } else if (qty > 1) {
      updateQty(productId, qty - 1);
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-6 sm:pb-10 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Discover our complete collection of {products.length} amazing products
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-700 dark:text-gray-300">
              Categories
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <p className="text-xl sm:text-2xl text-gray-500">No products found</p>
            <p className="text-sm sm:text-base text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock < 20 && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-3 sm:p-4">
                  <span className="text-xs text-primary font-semibold">{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base sm:text-lg font-bold mt-1 mb-1 sm:mb-2 hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 h-8 sm:h-10 overflow-hidden line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary">₹{product.price}</span>
                    {getCartQuantity(product.id) > 0 ? (
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <button
                          onClick={() => handleDecrement(product.id)}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-1.5 sm:p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <span className="text-base sm:text-lg font-semibold min-w-[2rem] text-center">
                          {getCartQuantity(product.id)}
                        </span>
                        <button
                          onClick={() => handleIncrement(product)}
                          className="bg-gradient-to-r from-primary to-secondary text-white p-1.5 sm:p-2 rounded-full hover:scale-105 transition-transform duration-200"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart className="text-sm" />
                        <span className="text-xs sm:text-sm">Add to Cart</span>
                      </button>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
                    {product.stock > 0 ? (
                      <span className="text-green-600 dark:text-green-400">
                        ✓ In Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
