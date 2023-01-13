const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    const categories = await Category.findAll({
        include: [
            {
                model: Product,
            },
        ],
    });

    res.json(categories);
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    const { id } = req.params;
    const category = await Category.findByPk(id, {
        include: [
            {
                model: Product,
            },
        ],
    });

    res.json(category);
});

router.post('/', async (req, res) => {
    // create a new category
    const { category_name } = req.body;

    const category = await Category.create({
        category_name,
    });

    res.json(category);
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    const { id } = req.params;
    const { category_name } = req.body;

    try {
        const category = await Category.update(
            { category_name },
            { where: { id: id } }
        );
        res.json({ message: 'Category Updated Successfully' });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    const { id } = req.params;

    try {
        const category = await Category.destroy({
            where: {
                id: id,
            },
        });
        res.json({
            message: 'Category successfully destroyed.',
            category,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

module.exports = router;
