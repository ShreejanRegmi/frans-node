const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDB connected`);
        return connection;
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectMongo