
const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const categories = mongoose.model("categories", categoriesSchema);

module.exports = categories;