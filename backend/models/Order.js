const mongoose = require('mongoose')
const { Schema } = mongoose

const Order = mongoose.model(
    'Order',
    new Schema({
        totalprice: {
            type: Number,
            required: true
        },
        user: Object,
        product: Object
    },
        { timestamps: true }
    )
)

module.exports = Order