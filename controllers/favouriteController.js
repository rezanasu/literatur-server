const {Favourite} = require("../models")

class FavouriteController {

    static findAll(req, res, next) {

        Favourite.findAll({
            where: {
                userId: req.loggedUser.id
            }
        })
        .then(data => {

            res.status(200).json(data)
        })
        .catch(err => {
            next(err);
        })
    }

    static create(req, res, next) {
        // This is bookId
        let {id} = req.params;
        
        Favourite.findOne({
            where: {
                userId: req.loggedUser.id,
                bookId: id
            }
        })
        .then(foundData => {
            
            if(foundData) {
                next({name: "FavouriteExists"})
                throw "Favourite Already Exists"
            } else {
                return Favourite.create({
                        userId: req.loggedUser.id,
                        bookId: id
                    })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err);
        })
    }

    static destroy(req, res, next) {
        // This is Book ID
        let {id} = req.params

        Favourite.destroy({
            where: {
                userId: req.loggedUser.id,
                bookId: id
            }
        })
        .then(result => {

            if(result) {
                res.status(200).json({
                    msg: "Favourite deleted successfully"
                })
            } else {
                next({name: "DeleteFailed"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = FavouriteController;