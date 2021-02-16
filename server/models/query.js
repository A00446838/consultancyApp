const mongoose = require('mongoose')
const Schema = mongoose.Schema

const querySchema = new Schema({
    email: {
        type: String
    },
    queryType: {
        type: String
    },
    message: {
        type: String
    },
    consultantEmail: {
        type: String
    }
}, { timestamps: true })

const Query = mongoose.model('Query', querySchema)
module.exports = Query