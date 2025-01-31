const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      //should Tag.findAll be ProductTag.findAll????
      include: [{ model: Product, through: ProductTag }], //should this includ ProductTag as well? I get this error when it does: "name": "SequelizeEagerLoadingError"
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }], //, { model: ProductTag}],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const { tag_name } = req.body;
    if (!tag_name) {
      res.status(400).json({ message: "tag name required" });
      return;
    }
    const tagData = await Tag.create({ tag_name });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
