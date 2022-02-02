const express = require("express");
const bookRouter = express.Router();
const BookController = require("../controllers/bookController.js")

bookRouter.get("/books", BookController.findAll);
bookRouter.get("/books/:id", BookController.findOne);
bookRouter.post("/books", BookController.create);
bookRouter.put("/books/:id", BookController.update);
bookRouter.delete("/books/:id", BookController.destroy);

module.exports = bookRouter;