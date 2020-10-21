const router = require('express').Router();
const Category = require('../models/Category')

router.post('/category', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        return res.send(category);
    } catch (error) {
        console.error(error)
    }
})

module.exports = router