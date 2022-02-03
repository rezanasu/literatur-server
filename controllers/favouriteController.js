const {Favourite} = require("../models")

class FavouriteController {

    static findAll(req, res, next) {

    }

    static create(req, res, next) {
        let {id} = req.params;

        Favourite.create({
            userId: req.loggedUser.id,
            bookId: id
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err);
        })
    }

    static destroy(req, res, next) {

    }
}

module.exports = FavouriteController;