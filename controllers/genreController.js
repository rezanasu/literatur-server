const {Genre} = require("../models");

class GenreController {

    static findAll(req, res, next) {
        
        Genre.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static findOne(req, res, next) {
        let {id} = req.params;
        
        Genre.findOne({
            where: {
                id
            }
        })
        .then(data => {
            
            if(data) {
                res.status(200).json(data)
            } else {
                next({name: "GenreNotFound"})
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static create(req, res, next) {
        let {name} = req.body;
        
        Genre.create({
            name
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static destroy(req, res, next) {
        let {id} = req.params;
        
        Genre.destroy({
            where: {
                id
            }
        })
        .then(data => {

            if(data) {
                res.status(200).json({
                    msg: "Genre deleted successfully"
                })
            } else {
                next({name: "DeleteFailed"});
            }
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = GenreController;