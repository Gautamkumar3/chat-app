const mongoose = require("mongoose")
require('dotenv').config()
const URL = process.env.URL

const Connect = () => {
    return mongoose.connect(`${URL}/my-chat`)
}

module.exports = Connect;