const Account = require("../models/People")

const getAllAccounts = async (req,res) => {
    try {
        const accounts = await Account.find().lean()
        res.send(accounts)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllAccounts
}