const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
        as: "product_tags"
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    handleResponse(res, tag);
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
  try {
    const [rowsAffected, tag] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (rowsAffected > 0) {
      handleResponse(res, tag);
    } else {
      handleErrorResponse(res, { message: 'Tag not found' });
    }
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const rowsAffected = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected > 0) {
      handleResponse(res, { message: 'Tag deleted successfully' });
    } else {
      handleErrorResponse(res, { message: 'Tag not found' });
    }
  } catch (err) {
    handleErrorResponse(res, err);
  }
});

module.exports = router;
