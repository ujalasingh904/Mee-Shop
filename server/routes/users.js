// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    // Create new user
    const user = new User({ username, email, password });
    await user.save();
    
    res.status(201).json({ 
      id: user._id, 
      username: user.username,
      email: user.email,
      cart: user.cart 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      id: user._id, 
      username: user.username,
      email: user.email,
      cart: user.cart 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user cart
router.get('/:userId/cart', async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post('/:userId/cart', async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { productId, name, price, image, quantity } = req.body;
    
    // Check if item already exists in cart
    const existingItem = user.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, name, price, image, quantity });
    }
    
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
router.put('/:userId/cart/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { quantity } = req.body;
    const cartItem = user.cart.find(item => item.productId === req.params.productId);
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    cartItem.quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/:userId/cart/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = user.cart.filter(item => item.productId !== req.params.productId);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.delete('/:userId/cart', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = [];
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
