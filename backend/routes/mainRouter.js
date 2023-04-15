const express = require("express");
const mainRouter = express.Router();
const accountController = require("../controllers/accountController.js")

mainRouter.get("/", (req, res) => res.send("Hello world"));

mainRouter.get("/allAccounts", accountController.getAllAccounts);
mainRouter.post("/createAccount", accountController.createAccount);
mainRouter.post("/login", accountController.login);
mainRouter.get("/addWish", accountController.addWish);
mainRouter.post("/changeWish", accountController.changeWish);
mainRouter.get("/finishWish", accountController.finishWish);
mainRouter.get("/getTopTenWish", accountController.getTopTenWish);
mainRouter.get("/getRandomTen", accountController.getRandomTen);

module.exports = mainRouter;

// getAllAccounts, createAccount, login, addWish, changeWish, finishWish, getTopTenWish 