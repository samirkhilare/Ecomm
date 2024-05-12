
const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    street_name: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: Number
    },
    pincode: {
        type: Number
    },
    user_id: {
        type: String
    }
})

const address = mongoose.model("address", addressSchema);

module.exports = address;