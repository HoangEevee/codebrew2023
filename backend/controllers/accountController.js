const Account = require("../models/People")

const getAllAccount = async (req,res) => {
    try {
        const accounts = await Account.find().lean()
        res.send(accounts)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllAccount
}