const express = require("express");
const authorRouter = express.Router();
const AuthorController = require("../controllers/authorController.js");

authorRouter.get("/authors", AuthorController.findAll);
authorRouter.get("/authors/:id", AuthorController.findOne);
authorRouter.post("/authors", AuthorController.create);
authorRouter.delete("/authors/:id", AuthorController.destroy);


module.exports = authorRouter;