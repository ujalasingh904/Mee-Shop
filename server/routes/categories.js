// server/routes/categories.js
const express = require('express');
const router = express.Router();
const { categories } = require('../data/categories');

// Get all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// Add new category
router.post('/', (req, res) => {
  const newCategory = { ...req.body, id: Date.now().toString() };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

module.exports = router;
