const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const category = await Category.findAll({
    include: Product,
  })
  res.json(category);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const categoryId = await Category.findByPk(
    req.params.id, { include: Product })
  res.json(categoryId);
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);

});
router.put("/:id", async (req, res) => {
  const updateCategory = await Category.findByPk(req.params.id, { include: Product })
  if (!updateCategory) {
    res.sendStatus(404);
  }
  else {
    await updateCategory.update(req.body);
    res.json(updateCategory)
  }
})


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.findByPk(req.params.id)
  if (!deleteCategory) {
    res.sendStatus(404);
  } else {
    await deleteCategory.destroy();
    res.sendStatus(204);
  }
});

module.exports = router;