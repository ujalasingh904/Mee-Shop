import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || `ORD${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    // Cart is already cleared by the backend when order is created
    // No need to clear again
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <FiCheckCircle className="text-6xl text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiPackage className="text-3xl text-primary" />
              <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="text-xl font-bold text-primary">#{orderNumber}</p>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-600 pt-4 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can track your order status in your account dashboard.
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              📦 Estimated Delivery
            </p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Go to Home
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact our customer support at{' '}
              <a href="mailto:support@mee-shop.com" className="text-primary hover:underline">
                support@mee-shop.com
              </a>
              {' '}or call{' '}
              <a href="tel:+919876543210" className="text-primary hover:underline">
                +91 9876543210
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
