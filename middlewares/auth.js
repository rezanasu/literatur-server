const {verifyToken} = require("../helpers/jwt.js");
const {User, Book, User_Read} = require("../models")

async function authentication(req, res, next) {

    const {access_token} = req.headers;
    
    if(access_token) {
        try {
    
            const decoded = await verifyToken(access_token);
            
            User.findOne({
                where: {
                    email: decoded.email
                }
            })
            .then(foundUser => {

                if(foundUser) {
                    req.loggedUser = {
                        id: foundUser.id,
                        email: foundUser.email,
                        username: foundUser.username
                    }
                    next();
                } else {
                    next({name: "UserNotFound"})
                }
            })
            .catch(err => {
                next(err)
            })
            
    
        } catch(err) {
            next(err);
        }

    } else {
        next({name: "Unauthenticate"})
    }

}

async function bookAuthorization(req, res, next) {
    
    const bookId = req.params.id;

    try {

        const bookData = await Book.findOne({
            include: {
                model: User
            },
            where: {
                id: bookId
            }
        })

        if (bookData) {
            
            const users = bookData.Users;
            
            if (users.length === 0) {
                next({name:"Unauthenticate"})
            }

            let isAllowed = false;
            users.forEach(element => {
                if(element.id === req.loggedUser.id) {
                    isAllowed = true;
                    next()
                } 
            })

            if(!isAllowed) {
                next({name:"Unauthenticate"})
            }

        } else {
            next({name: "BookNotFound"})
        }
    } catch(err) {
        next(err)
    }

}

module.exports = {
    authentication,
    bookAuthorization
}