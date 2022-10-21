const jwt = require("jsonwebtoken")
const User = require("../user/user.schema");
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const AuthMiddleware = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (er) {
            res.status(401).send("User don't have token")
        }
    } else {
        res.status(401).send("User don't have token")
    }
}

module.exports = AuthMiddleware;