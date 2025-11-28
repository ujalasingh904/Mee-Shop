import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 dark:text-gray-400">Add some products to get started!</p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Your Cart</h2>
      <div className="space-y-3 sm:space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <img src={item.image || item.img} alt={item.title || item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title || item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <input 
                type="number" 
                min="1" 
                value={item.qty} 
                onChange={e => updateQty(item.id, Math.max(1, Number(e.target.value)))} 
                className="w-16 px-2 py-1 border rounded text-center dark:bg-gray-700 dark:border-gray-600" 
              />
              <p className="font-bold w-20 text-right">₹{(item.price * item.qty).toFixed(2)}</p>
              <button 
                className="text-red-600 hover:text-red-800 font-semibold text-sm sm:text-base" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl font-bold">Total:</span>
          <span className="text-xl sm:text-2xl font-bold text-primary">₹{total}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <button 
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold" 
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
