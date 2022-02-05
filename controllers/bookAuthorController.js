const {Book_Author} = require("../models")

class BookAuthorController {

    static create(req, res, next) {
        let {bookId, authorId} = req.params;

        Book_Author.findOne({
            where: {
                bookId,
                authorId
            }
        })
        .then(foundData => {

            if(foundData) {
                next({name: "BookAuthorExists"})
                throw "Book Author already exists"
            } else {
                return  Book_Author.create({
                        bookId,
                        authorId
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
        let {id} = req.params;

        Book_Author.destroy({
            where: {
                id
            }
        })
        .then(result => {
            
            if(result) {
                res.status(200).json({
                    msg: "Book Author relation deleted successfully"
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

module.exports = BookAuthorController;