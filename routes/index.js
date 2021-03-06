const express = require("express")
const router = express.Router();
const userRouter = require("./user.js")
const bookRouter = require("./book.js")
const userReadRouter = require("./userRead.js")
const wishlistRouter = require("./wishlist.js")
const favouriteRouter = require("./favourite.js")
const authorRouter = require("./author.js")
const bookAuthorRouter = require("./bookAuthor.js")
const genreRouter = require("./genre.js")
const bookGenreRouter = require("./bookGenre.js")
const {authentication} = require("../middlewares/auth.js")

router.use("/", userRouter);
router.use(authentication);
router.use("/", bookRouter);
router.use("/", userReadRouter);
router.use("/", wishlistRouter);
router.use("/", favouriteRouter);
router.use("/", authorRouter);
router.use("/", bookAuthorRouter);
router.use("/", genreRouter);
router.use("/", bookGenreRouter);


module.exports = router;