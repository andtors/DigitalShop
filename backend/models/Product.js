const mongoose = require('mongoose')
const {Schema} = mongoose 

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)
)

module.exports = Product