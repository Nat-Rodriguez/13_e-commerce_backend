const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// Get one tag
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tag => {
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tag => {
    res.status(200).json(tag);
  })
  .catch(error => {
    res.status(404).json(error);
  });
});

// Update a tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then(() => {
    Tag.findOne({ where: { id: req.params.id } })
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(error => {
      res.status(404).json(error);
    });
  })
  .catch(error => {
    res.status(404).json(error);
  });
});

// Delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(tag => {
    res.status(200).json(tag);
  })
  .catch(error => {
    res.status(404).json(error);
  });
});


module.exports = router;
