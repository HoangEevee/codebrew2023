const express = require("express");
const mainRouter = express.Router();
const accountController = require("../controllers/accountController.js")

mainRouter.get("/", (req, res) => res.send("Hello world"));

mainRouter.get("/allAccounts", accountController.getAllAccounts);


module.exports = mainRouter;
