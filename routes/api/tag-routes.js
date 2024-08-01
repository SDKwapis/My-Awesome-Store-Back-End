const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Category.findAll({
      include: [{ model: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tagData = await Category.findByPk(req.param.id, {
      include: [{ model: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    restart.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body;
    if (!tag_name) {
      return res.status(400).json({ message: 'tag name required' })
    }
    const tagData = await Tag.create({ tag_name });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occured' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No category found with that id!" });
    }
    restart.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
