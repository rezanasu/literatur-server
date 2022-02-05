const express = require("express");
const wishlistRouter = express.Router();
const WishlistController = require("../controllers/wishlistController.js");
const {bookAuthorization} = require("../middlewares/auth.js")

wishlistRouter.get("/wishlists", WishlistController.findAll);
wishlistRouter.post("/wishlists/:id", bookAuthorization, WishlistController.create)
wishlistRouter.delete("/wishlists/:id", bookAuthorization, WishlistController.delete)

module.exports = wishlistRouter;