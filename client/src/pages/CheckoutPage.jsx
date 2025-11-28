import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { createOrder } from '../services/api';
import { FiShoppingCart, FiArrowLeft, FiTruck, FiCreditCard } from 'react-icons/fi';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState('address'); // 'address' or 'payment'
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare order data
      const orderData = {
        userId: user.id,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image
        })),
        shippingAddress: shippingInfo,
        paymentInfo: {
          method: paymentInfo.paymentMethod,
          status: 'completed'
        },
        subtotal,
        shipping,
        tax,
        total
      };

      // Create order in database
      const order = await createOrder(orderData);
      
      if (order.error) {
        throw new Error(order.error);
      }

      // Navigate to order success with order number
      navigate('/order-success', { state: { orderNumber: order.orderNumber } });
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingInfo({ ...shippingInfo, [name]: value });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
        <FiShoppingCart className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-10 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => currentStep === 'payment' ? setCurrentStep('address') : navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep === 'address' ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
                <FiTruck className="text-sm sm:text-base" />
              </div>
              <span className="ml-1 sm:ml-2 font-semibold text-xs sm:text-sm md:text-base">Shipping</span>
            </div>
            <div className="w-12 sm:w-24 h-1 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600'}`}>
                <FiCreditCard className="text-sm sm:text-base" />
              </div>
              <span className="ml-1 sm:ml-2 font-semibold text-xs sm:text-sm md:text-base">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === 'address' ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shipping Address</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        rows="3"
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingInfo.pincode}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="400001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 bg-gray-100 dark:bg-gray-600"
                        readOnly
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                  {/* Payment Method Selection */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium mb-3">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'card' })}
                        className={`p-4 border-2 rounded-lg text-center ${paymentInfo.paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-700'}`}
                      >
                        <FiCreditCard className="mx-auto mb-2 text-2xl" />
                        <span className="text-sm font-medium">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'upi' })}
                        className={`p-4 border-2 rounded-lg text-center ${paymentInfo.paymentMethod === 'upi' ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-700'}`}
                      >
                        <span className="text-2xl mb-2 block">💳</span>
                        <span className="text-sm font-medium">UPI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'cod' })}
                        className={`p-4 border-2 rounded-lg text-center ${paymentInfo.paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-700'}`}
                      >
                        <span className="text-2xl mb-2 block">💵</span>
                        <span className="text-sm font-medium">COD</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {paymentInfo.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          required
                          pattern="[0-9]{16}"
                          maxLength="16"
                          className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          required
                          className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange(e, 'payment')}
                            required
                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                            maxLength="5"
                            className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV *</label>
                          <input
                            type="password"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange(e, 'payment')}
                            required
                            pattern="[0-9]{3,4}"
                            maxLength="4"
                            className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Payment */}
                  {paymentInfo.paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">UPI ID *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700"
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  {paymentInfo.paymentMethod === 'cod' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>Note:</strong> You will pay ₹{total.toFixed(2)} in cash when your order is delivered.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-20">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Order Summary</h3>
              <div className="space-y-2 sm:space-y-3 max-h-60 overflow-y-auto mb-3 sm:mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-2 sm:gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      <p className="text-xs sm:text-sm font-semibold">₹{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
