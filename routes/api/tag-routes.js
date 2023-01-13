const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data

    try {
        const tags = await Tag.findAll({
            include: [
                {
                    model: Product,
                },
            ],
        });
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const { id } = req.params;
    try {
        const tag = await Tag.findByPk(id, {
            include: [
                {
                    model: Product,
                },
            ],
        });
        res.json(tag);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    const { tag_name } = req.body;

    try {
        const tag = await Tag.create({
            tag_name,
        });
        res.json({
            message: 'Tag successfully created.',
            tag,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value

    const { id } = req.params;
    const { tag_name } = req.body;
    try {
        const tag = await Tag.update(
            {
                tag_name,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.json(tag);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    const { id } = req.params;
    try {
        await Tag.destroy({ where: { id: id } });
        res.json('Tag destroyed successfully');
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

module.exports = router;
