const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    password: String,
    // using email as primary key to identify 
    email: { type: String, required: true, index: true, unique: true }, 
    age: Number,
    fbAcc: String,
    IgAcc: String,
    wishlist: { type: [{wish: String, schedFin: Date, completed: Boolean}], required: false, default: false}
})

const Account = mongoose.model("account", schema)
module.exports = Account