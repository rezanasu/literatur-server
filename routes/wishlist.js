const express = require("express");
const wishlistRouter = express.Router();
const WishlistController = require("../controllers/wishlistController.js");

wishlistRouter.post("/wishlists/:bookId", WishlistController.create)
wishlistRouter.delete("/wishlists/:id", WishlistController.delete)

module.exports = wishlistRouter;