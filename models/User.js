const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', User)