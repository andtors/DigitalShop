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
        images: {
            type: Array,
            required: true,
        },
        quantity : {
            type: Number,
            require: true,
        },
    },
    {timestamps: true}
)
)

module.exports = Product