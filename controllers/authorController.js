const {Author} = require("../models")

class AuthorController {

    static findAll(req, res, next) {
        
        Author.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static findOne(req, res, next) {
        let {id} = req.params;

        Author.findOne({
            where: {
                id
            }
        })
        .then(data => {

            if(data) {
                res.status(200).json(data)
            } else {
                next({name: "AuthorNotFound"})
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static create(req, res, next) {
        let {firstName, lastName} = req.body;
        
        Author.create({
            firstName,
            lastName
        })
        .then(data => {
            res.status(201).json({
                msg: "Author created successfully",
                author: data
            })
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                next({name: "ValidationError", currentError: err})
            } else {
                next(err)
            }
        })
    }

    // Optional
    static destroy(req, res, next) {
        let {id} = req.params;

        Author.destroy({
            where: {
                id
            }
        })
        .then(result => {

            if(result) {
                res.status(200).json({
                    msg: "Author deleted successfully"
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

module.exports = AuthorController;