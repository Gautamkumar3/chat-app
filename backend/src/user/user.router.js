const express = require("express");
const generateToken = require("../config/token");
const AuthMiddleware = require("../middleware/authMiddleware");
const User = require("./user.schema");



const app = express.Router();

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (!user) {
            let newUser = new User({ ...req.body })
            await newUser.save();
            let token = generateToken(newUser._id)
            res.status(200).send({ _id: newUser._id, name: newUser.name, email: newUser.email, pic: newUser.pic, token: token })
        } else {
            res.status(403).send("This email is already in use please change the email and try for signup")
        }
    } catch (er) {
        res.status(401).send(er.message)
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            let token = generateToken(user._id)
            return res.status(200).send({ msg: "Login Successful", data: { _id: user._id, name: user.name, email: user.email, pic: user.pic, token: token } })
        } else {
            return res.status(404).send("User not found")
        }
    } catch (er) {
        return res.status(403).send(er.message)
    }
})

app.get("/", AuthMiddleware, async (req, res) => {
    const keyword = req.query.search ? { $or: [{ name: { $regex: req.query.search, $options: "i" } }, { email: { $regex: req.query.search, $options: "i" } }] } : {}
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    res.send(users)
})


module.exports = app;