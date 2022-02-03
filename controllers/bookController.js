const {Book, User, User_Read} = require("../models")

class BookController {

    static findAll(req, res, next) {

        Book.findAll({
            include: [{
                model: User,
                required: true,
                where: {
                    id: req.loggedUser.id
                }
            }]
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        let {id} = req.params

        Book.findOne({
            where: {
                id
            }
        })
        .then(data => {

            if(data) {
                res.status(200).json(data)
            } else {
                next({name: "BookNotFound"})
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static create(req, res, next) {
        let {title, description, year, publisher, coverImage} = req.body;

        Book.findOne({
            where: {
                title,
                publisher,
                year
            }
        })
        .then(result => {

            if(result) {
                next({name: "BookExists"})
                throw "Book Already Exists"
            }
        })
        .then(_ => {
            return Book.create({
                title,
                description,
                year,
                publisher,
                coverImage
            })

        })
        .then(bookData => {
            return User_Read.create({
                userId: req.loggedUser.id,
                bookId: bookData.id,
                status: "unread"
            })
        })
        .then(userReadData => {
            res.status(201).json({
                msg: "Book created successfully",
                book: bookData,
                userRead: userReadData
            });
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                next({name: "ValidationError", currentError: err})
            } else if(err.name === "SequelizeDatabaseError") {
                next({name: "DatabaseError"})
            } else {
                next(err)
            }
        })

    }

    static update(req, res, next) {
        let {title, description, year, publisher, coverImage} = req.body;
        let {id} = req.params;

        Book.update({
            title,
            description,
            year,
            publisher,
            coverImage
        }, {
            where: {
                id
            }
        })
        .then(result => {
            if(result) {
                res.status(200).json({
                    msg: "Book updated successfully"
                })
            } else {
                next({name: "UpdateFailed"})
            }
        })
        .catch(err => {

            if(err.name === "SequelizeValidationError") {
                next({name: "ValidationError", currentError: err})
            } else if(err.name === "SequelizeDatabaseError") {
                next({name: "DatabaseError"})
            } else {
                next(err)
            }

        })

    }

    static destroy(req, res, next) {
        let {id} = req.params;

        Book.destroy({
            where: {
                id
            }
        })
        .then(result => {

            if(result) {
                res.status(200).json({
                    msg: "Book deleted successfully"
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

module.exports = BookController