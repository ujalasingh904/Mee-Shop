// client/src/services/api.js
const API_URL = 'http://localhost:5000/api';

// User API
export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// Cart API
export const getCart = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/cart`);
  return response.json();
};

export const addToCart = async (userId, product) => {
  const response = await fetch(`${API_URL}/users/${userId}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateCartItem = async (userId, productId, quantity) => {
  const response = await fetch(`${API_URL}/users/${userId}/cart/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  return response.json();
};

export const removeFromCart = async (userId, productId) => {
  const response = await fetch(`${API_URL}/users/${userId}/cart/${productId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const clearCart = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/cart`, {
    method: 'DELETE',
  });
  return response.json();
};

// Order API
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const getUserOrders = async (userId) => {
  const response = await fetch(`${API_URL}/orders/user/${userId}`);
  return response.json();
};

export const getOrderByNumber = async (orderNumber) => {
  const response = await fetch(`${API_URL}/orders/number/${orderNumber}`);
  return response.json();
};
