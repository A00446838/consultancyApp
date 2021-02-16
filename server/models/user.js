const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userType: {
        type: String
    },
    consultancyType: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    activeToken: {
        type: String
    },
    isAdmin: {
        type: Boolean, default: false
    },
    isActive: {
        type: Boolean, default: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User