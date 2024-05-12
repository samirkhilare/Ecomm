
const { number } = require('joi');
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const order = mongoose.model("order", orderSchema);

module.exports = order;