const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET)
}

function verifyToken(access_token) {
    return jwt.verify(access_token, JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}