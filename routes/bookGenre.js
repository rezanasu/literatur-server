const express = require("express");
const bookGenreRouter = express.Router();
const BookGenreController = require("../controllers/bookGenreController.js");

bookGenreRouter.post("/book-genres/:bookId/:genreId", BookGenreController.create);
bookGenreRouter.delete("/book-genres/:id", BookGenreController.destroy);

module.exports = bookGenreRouter;