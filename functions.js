const Category = require('./models/Category')

const getCategories = async () => {
    try {
        const categories = await Category.find({});
        return categories
    } catch (error) {
        console.error(error)
        return [];
    }
}

module.exports= {
    getCategories
}