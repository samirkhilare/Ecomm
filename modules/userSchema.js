const { string } = require('joi');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    age: {
        type: String
    },
    role: {
        type: String
    },
    photoUrl: {
        type: String
    },
    type: {
        type: String
    }
})

const users = mongoose.model("user", userSchema);

module.exports = users;