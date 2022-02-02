const {Book, User, User_Read} = require("../models")

class BookController {

    static findAll(req, res, next) {

        // include: {
        //     model: User,
        //     where: {
        //         userId: req.loggedUser.id
        //     }
        // }
        
        Book.findAll({
            include: {
                model: User,
                where: {
                    'userId': req.loggedUser.id
                }
            }
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        res.send("MASOOK")
    }

    static create(req, res, next) {
        res.send("MASOOK")
    }

    static update(req, res, next) {
        res.send("MASOOK")
    }

    static destroy(req, res, next) {
        res.send("MASOOK")
    } 
}

module.exports = BookController