const express = require("express");
const mainRouter = express.Router();

mainRouter.get("/", (req, res) => res.send("Hello world"));
mainRouter.get("/account", require("./accountRouter"));


module.exports = mainRouter;
