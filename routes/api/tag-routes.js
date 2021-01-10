const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    include: Product, Tag
  });
  res.json(tags);
  // be sure to include its associated Product data
});
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tagId = await Tag.findByPk(req.params.id, { include: Product });
  if (!tagId) {
    res.sendStatus(404);
  } else {
    res.json(tagId);
  }
  // be sure to include its associated Product data
});
router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.status(201).json(newTag);
});
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.findByPk(req.params.id, { include: Product, Tag });
  if (!updateTag) {
    res.sendStatus(404);
  } else {
    await updateTag.update(req.body);
    res.json(updateTag);
  }
});
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.findByPk(req.params.id);
  if (!deleteTag) {
    res.sendStatus(404);
  } else {
    await deleteTag.destroy();
    res.sendStatus(204);
  }
});
module.exports = router;