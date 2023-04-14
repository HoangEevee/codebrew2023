const express = require("express")
const accountRouter = express.Router()
const accountController = require("../controllers/accountController.js")

accountRouter.get("/allAccounts", accountController.getAllAccount)

module.exports = accountRouter