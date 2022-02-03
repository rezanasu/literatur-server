const express = require("express");
const favouriteRouter = express.Router();
const FavouriteController = require("../controllers/favouriteController.js");
const { bookAuthorization } = require("../middlewares/auth.js");

favouriteRouter.get("/favourites", FavouriteController.findAll);
favouriteRouter.post("/favourites/:id", bookAuthorization, FavouriteController.create);
favouriteRouter.delete("/favourites/:id", bookAuthorization, FavouriteController.destroy);

module.exports = favouriteRouter;
