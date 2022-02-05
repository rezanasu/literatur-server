const express = require("express");
const bookAuthorRouter = express.Router();
const BookAuthorController = require("../controllers/bookAuthorController.js");

bookAuthorRouter.post("/book-authors/:bookId/:authorId", BookAuthorController.create);
bookAuthorRouter.delete("/book-authors/:id", BookAuthorController.destroy)

module.exports = bookAuthorRouter;