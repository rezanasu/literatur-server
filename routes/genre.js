const express = require("express");
const genreRouter = express.Router();
const GenreController = require("../controllers/genreController.js");

genreRouter.get("/genres", GenreController.findAll);
genreRouter.get("/genres/:id", GenreController.findOne);
genreRouter.post("/genres", GenreController.create);
genreRouter.delete("/genres/:id", GenreController.destroy);

module.exports = genreRouter;