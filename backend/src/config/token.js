const jwt = require("jsonwebtoken")
require('dotenv').config()
const secret_key = process.env.SECRET_KEY

const generateToken = (id) => {
    return jwt.sign({ id }, secret_key, { expiresIn: "7 days" })
}

module.exports = generateToken;