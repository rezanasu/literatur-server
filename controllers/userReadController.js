const {User_Read} = require("../models")

class UserReadController {

    static create(req, res, next) {
        let {bookId} = req.params;
        let {status} = req.body;
        
        User_Read.findOne({
            where: {
                userId: req.loggedUser.id,
                bookId
            }
        })
        .then(data => {
            
            if(data) {
                next({name: "BookExists"})
            } else {
                User_Read.create({
                    userId: req.loggedUser.id,
                    bookId,
                    status: status.toLowerCase()
                })
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    if(err.name === "SequelizeValidationError") {
                        next({name: "ValidationError", currentError: err})
                    } else {
                        next(err);
                    }
                })
            }
        })
        .catch(err => {
            next(err)
        })

    }

    static delete(req, res, next) {
        let {id} = req.params;

        User_Read.destroy({
            where: {
                id
            }
        })
        .then(result => {

            if(result) {
                res.status(200).json({
                    msg: "Book Read deleted successfully"
                })
            } else {
                res.status(400).json({
                    msg: "Delete failed"
                })
            } 
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserReadController