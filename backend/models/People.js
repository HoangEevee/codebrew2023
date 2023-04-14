const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    age: String,
    password: String,
    facebookAcc: String
})

const People = mongoose.model("People", schema)
module.exports = People