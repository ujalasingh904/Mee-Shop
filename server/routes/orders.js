// server/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentInfo, subtotal, shipping, tax, total } = req.body;
    
    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Calculate estimated delivery (5-7 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 6);
    
    // Create order
    const order = new Order({
      userId,
      orderNumber,
      items,
      shippingAddress,
      paymentInfo,
      subtotal,
      shipping,
      tax,
      total,
      estimatedDelivery
    });
    
    await order.save();
    
    // Add order reference to user
    const user = await User.findById(userId);
    if (user) {
      user.orders.push(order._id);
      user.cart = []; // Clear cart after order
      await user.save();
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by order number
router.get('/number/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
