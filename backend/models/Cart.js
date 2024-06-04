const mongoose = require('mongoose')
const { Schema } = mongoose

const Cart = mongoose.model(
    'Cart',
    new Schema({
        quantity: {
            type: Number,
            required: true
        },
        product: Object,
        user: Object
    },
        { timestamp: true }
    ),
)

module.exports = Cart