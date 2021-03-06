function errorHandler(err, req, res, next) {
    let messages = [];

    if(err.name === "ValidationError") {

        err.currentError.errors.forEach(element => {
            messages.push(element)
        })
        res.status(400).json({msg: messages})
    } else if(err.name === "UniqueConstraintError") {
        err.currentError.errors.forEach(element => {
            messages.push(element)
        })
        res.status(400).json({msg: messages})
    } else if(err.name === "UserNotFound") {
        res.status(404).json({msg: "User Not Found"})
    } else if(err.name === "Unauthenticate") {
        res.status(400).json({msg: "Unauthenticate"})
    } else if(err.name === "WrongInput") {
        res.status(400).json({msg: "Invalid Email or Password. Please Try Again.."})
    } else if(err.name === "BookExists") {
        res.status(400).json({msg: "Book Already Exists"})
    } else if(err.name === "BookNotFound") {
        res.status(400).json({msg: "Book Not Found"});
    } else if(err.name === "DatabaseError") {
        res.status(500).json({msg: "Database Error"})
    } else if(err.name === "UpdateFailed") {
        res.status(400).json({msg: "Update Failed"})
    } else if(err.name === "DeleteFailed") {
        res.status(400).json({msg: "Delete Failed"})
    } else if(err.name === "WishlistExists") {
        res.status(400).json({msg: "Wishlist Already Exists"})
    } else if(err.name === "FavouriteExists") {
        res.status(400).json({msg: "Favourite Already Exists"})
    } else if(err.name === "AuthorNotFound") {
        res.status(404).json({msg: "Author Not Found"})
    } else if(err.name === "BookAuthorExists") {
        res.status(400).json({msg: "Book Author relation already exists"})
    } else if(err.name === "GenreNotFound") {
        res.status(400).json({msg: "Genre Not Found"})
    } else if(err.name === "BookGenreExists") {
        res.status(400).json({msg: "Book Genre relation already exists"})
    }
     
    
    
    
    
    else {
        console.log(err, "<<<<<<<<<<<<+++++ INI ERRORNYA BOS")
        res.status(500).json("ERROR INVALID")
    }
}

module.exports = errorHandler;