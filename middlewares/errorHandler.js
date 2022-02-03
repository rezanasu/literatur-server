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
    }
     
    
    
    
    
    else {
        console.log(err, "<<<<<<<<<<<<+++++ INI ERRORNYA BOS")
        res.status(500).json("ERROR INVALID")
    }
}

module.exports = errorHandler;