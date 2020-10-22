const Category = require('./models/Category')
const Furniture = require('./models/Furniture')

const getCategories = async () => {
    try {
        const categories = await Category.find({});
        return categories
    } catch (error) {
        console.error(error)
        return {err: 'Server Error'};
    }
}

const getFurnitures = async () => {
    try {
        const furnitures = await Furniture.find({}).populate('category')
        return furnitures
    } catch (error) {
        console.error(error)
        return { err: "Server Error" }
    }
}

module.exports = {
    getCategories,
    getFurnitures
}