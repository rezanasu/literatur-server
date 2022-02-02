const {User} = require("../models")
const {generateToken} = require("../helpers/jwt.js")
const bcrypt = require("bcrypt")

class UserController {

    static register(req, res, next) {
        let {email, username, password} = req.body;

        User.create({
            email,
            username,
            password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            
            if(err.name === "SequelizeValidationError") {
                next({name: "ValidationError", currentError: err})
            } else if(err.name === "SequelizeUniqueConstraintError") {
                next({name: "UniqueConstraintError", currentError: err})
            } else {
                next(err)
            }
        })
    }

    static login(req, res, next) {
        let {email, password} = req.body;
       
        User.findOne({
            where: {
                email
            }
        })
        .then(data => {
            if(data) {

                const comparePassword = bcrypt.compareSync(password, data.password);

                if(comparePassword) {

                    const access_token = generateToken({
                        email,
                        username: data.username
                    })

                    res.status(200).json({
                        msg: "Login successfully",
                        access_token
                    })
                } else {
                    next({name: "WrongInput"})
                }
            } else {
                next({name: "UserNotFound"})
            }
        })
        .catch(err => {
            console.log(err.name, "<<<<<<<<<< INI ERROR")
            if(err.name === "SequelizeValidationError") {
                next({name: "ValidationError", currentError: err})
            } else if(err.name === "SequelizeUniqueConstraintError") {
                next({name: "UniqueConstraintError", currentError: err})
            } else {
                next(err)
            }
        })
    }
}

module.exports = UserController;