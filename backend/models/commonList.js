const mongoose = require("mongoose");

// a list of common wishes, added by the dev, everytime a new user added something new
// the list is updated before doing some lemmatisation to the string
const schema = new mongoose.Schema({
    wish: {type: String, required: true},
    count: {type: Number, default: 0}
});

const commonList = mongoose.model("common_wish_list", schema);
module.exports = commonList;