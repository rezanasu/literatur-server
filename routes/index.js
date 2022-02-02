const express = require("express")
const router = express.Router();
const userRouter = require("./user.js")
const bookRouter = require("./book.js")
const userReadRouter = require("./userRead.js")
const {authentication} = require("../middlewares/auth.js")

router.use("/", userRouter);
router.use(authentication);
router.use("/", bookRouter);
router.use("/", userReadRouter);


module.exports = router;