const {Book_Genre} = require("../models")

class BookGenreController {

    static create(req, res, next) {
        let {bookId, genreId} = req.params;
        
        Book_Genre.findOne({
            where: {
                bookId,
                genreId
            }
        })
        .then(bookGenre => {

            if(bookGenre) {
                next({name: "BookGenreExists"})
                throw "Book Genre Already Exists"
            } else {
                return Book_Genre.create({
                    bookId,
                    genreId
                })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static destroy(req, res, next) {
       
        // Book Genre id
        let {id} = req.params;

        Book_Genre.destroy({
            where: {
                id
            }
        })
        .then(result => {
            
            if(result) {
                res.status(200).json({
                    msg: "Book Genre deleted successfully"
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

module.exports = BookGenreController;