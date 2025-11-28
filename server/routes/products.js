// server/routes/products.js
const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Add new product
router.post('/', (req, res) => {
  const newProduct = { ...req.body, id: Date.now().toString() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// Delete product
router.delete('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
