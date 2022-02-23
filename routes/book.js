const express = require("express");
const bookRouter = express.Router();
const BookController = require("../controllers/bookController.js")
const {bookAuthorization} = require("../middlewares/auth.js")

bookRouter.get("/books", BookController.findAll);
bookRouter.get("/books/favourites", BookController.findFavourites);
bookRouter.get("/books/currents", BookController.findCurrentlyReading);
bookRouter.post("/books", BookController.create);
bookRouter.get("/books/:id", bookAuthorization, BookController.findOne);
bookRouter.put("/books/:id", bookAuthorization, BookController.update);
bookRouter.delete("/books/:id", bookAuthorization, BookController.destroy);

module.exports = bookRouter;