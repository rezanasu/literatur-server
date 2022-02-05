const express = require("express");
const userReadRouter = express.Router();
const UserReadController = require("../controllers/userReadController.js")

userReadRouter.post("/user-reads/:id", UserReadController.create)
userReadRouter.delete("/user-reads/:id", UserReadController.delete)

module.exports = userReadRouter;