import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user && user.id) {
        // Validate MongoDB ObjectId format
        if (!user.id.match(/^[0-9a-fA-F]{24}$/)) {
          console.error('Invalid user ID format, please login again');
          setCart([]);
          return;
        }
        
        try {
          setLoading(true);
          const cartData = await getCart(user.id);
          // Check if cartData is an array before mapping
          if (Array.isArray(cartData)) {
            const transformedCart = cartData.map(item => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              qty: item.quantity
            }));
            setCart(transformedCart);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCart([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCart([]);
      }
    };
    loadCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user || !user.id) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      const updatedCart = await apiAddToCart(user.id, cartItem);
      
      // Transform and update local state
      if (Array.isArray(updatedCart)) {
        const transformedCart = updatedCart.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.quantity
        }));
        setCart(transformedCart);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const removeFromCart = async (id) => {
    if (!user || !user.id) return;

    try {
      const updatedCart = await apiRemoveFromCart(user.id, id);
      
      // Transform and update local state
      if (Array.isArray(updatedCart)) {
        const transformedCart = updatedCart.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.quantity
        }));
        setCart(transformedCart);
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!user || !user.id) return;

    try {
      await apiClearCart(user.id);
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const updateQty = async (id, qty) => {
    if (!user || !user.id) return;

    try {
      const updatedCart = await updateCartItem(user.id, id, qty);
      
      // Transform and update local state
      if (Array.isArray(updatedCart)) {
        const transformedCart = updatedCart.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.quantity
        }));
        setCart(transformedCart);
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQty, loading }}>
      {children}
    </CartContext.Provider>
  );
};
