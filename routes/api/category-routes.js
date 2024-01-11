const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
  .then(categories => {
    res.json(categories);
  })
  .catch(error => {
    res.status(500).json({ error: 'Server error' });
  });
});

// Get one category by ID
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
  .then(category => {
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  })
  .catch(error => {
    res.status(400).json({ error: 'Bad request' });
  });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then(category => {
    res.status(201).json(category);
  })
  .catch(error => {
    res.status(400).json({ error: 'Invalid data provided' });
  });
});

// Update a category by ID
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(category => {
    if (category[0] === 1) {
      res.json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  })
  .catch(error => {
    res.status(400).json({ error: 'Invalid data or request' });
  });
});

// Delete a category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(category => {
    if (category === 1) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  })
  .catch(error => {
    res.status(400).json({ error: 'Invalid request' });
  });
});

module.exports = router;
