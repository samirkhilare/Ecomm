
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: String
    },
    short_desc: {
        type: String
    },
    cat_id: {
        type: String
    },
    category:{
        type: String
    }
})

const product = mongoose.model("product", productSchema);

module.exports = product;