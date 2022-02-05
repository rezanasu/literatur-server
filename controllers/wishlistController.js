const {Wishlist, Book, User, User_Read} = require("../models");

class WishlistController {

    static create(req, res, next) {

        let {bookId} = req.params;

        Wishlist.findOne({
            where: {
                userId: req.loggedUser.id,
                bookId
            }
        })
        .then(foundData => {

            if(foundData) {
                next({name: "WishlistExists"})
                throw "Wishlist Already Exists"
            } else {
                return Wishlist.create({
                        userId: req.loggedUser.id,
                        bookId
                    })
            }
        })
        .then(newWishlist => {
            res.status(201).json(newWishlist)
        })
        .catch(err => {
            next(err)
        })
        
    }

    static delete(req, res, next) {

        let {id} = req.params;

        Wishlist.destroy({
            where: {
                id
            }
        })
        .then(result => {
            console.log(result, "<<<<<< INI RESULT")
            if(result) {
                res.status(200).json({
                    msg: "Wishlist successfully deleted"
                })
            } else {
                next({name: "DeleteFailed"})
            }
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = WishlistController;
