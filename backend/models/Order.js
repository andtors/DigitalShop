const mongoose = require('mongoose')
const { Schema } = mongoose

const Order = mongoose.model(
    'Order',
    new Schema({
        totalprice: {
            type: Number,
        },
        user: Object
    },
        { timestamps: true }
    )
)

module.exports = Order