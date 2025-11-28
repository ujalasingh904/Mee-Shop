import { Suspense, useState, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/popup';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
const Home = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));

const App = () => {
  const [OrderPopup, setOrderPopup] = useState(false); 
  const handleOrderPopup = () => setOrderPopup((v) => !v);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
            <Navbar handleOrderPopup={handleOrderPopup} />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
              </Routes>
            </Suspense>
            <Footer />
            <Popup OrderPopup={OrderPopup} handleOrderPopup={handleOrderPopup} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
