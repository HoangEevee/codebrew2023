const express = require("express");
const mainRouter = express.Router();
const accountController = require("../controllers/accountController.js")

mainRouter.get("/", (req, res) => res.send("Hello world"));

mainRouter.get("/allAccounts", accountController.getAllAccounts);
mainRouter.post("/createAccount", accountController.createAccount);
mainRouter.get("/login", accountController.login);
mainRouter.post("/addWish", accountController.addWish);
mainRouter.post("/addWishlist", accountController.addWish);
mainRouter.post("/changeWish", accountController.changeWish);
mainRouter.post("/finishWish", accountController.finishWish);
mainRouter.get("/getTopTenWish", accountController.getTopTenWish);
mainRouter.get("/getRandomTen", accountController.getRandomTen);

module.exports = mainRouter;

// getAllAccounts, createAccount, login, addWish, changeWish, finishWish, getTopTenWish 