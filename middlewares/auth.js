const {verifyToken} = require("../helpers/jwt.js");
const {User} = require("../models")

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

function bookAuthorization(req, res, next) {
    
}

module.exports = {
    authentication,
    bookAuthorization
}