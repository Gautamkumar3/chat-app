const express = require("express");
const AuthMiddleware = require("../middleware/authMiddleware");
const User = require("../user/user.schema");
const Chat = require("./Chat.model");


const app = express.Router();

// ################## for one to one chat ###############

app.post("/", AuthMiddleware, async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(403).send("userId is missing")
    }

    let isChat = await Chat.find({
        isGroupchat: false, $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage")
    console.log(isChat, "first")

    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email" })

    console.log(isChat, "second")

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = { chatName: "sender", isGroupchat: false, users: [req.user._id, userId] }
    }

    try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
        res.status(200).send(FullChat);
    } catch (er) {
        res.status(400).send(er.message)
    }

})

// ################## for get all chat related to particular user ###############

app.get("/", AuthMiddleware, async (req, res) => {

})

// ################## for createGroup chat ###############

app.post("/group", AuthMiddleware, async (req, res) => {

})

// ################## for rename group ###############

app.put("/", AuthMiddleware, async (req, res) => {

})

// ################## for remove group ###############

app.put("/", AuthMiddleware, async (req, res) => {

});

// ################## for add group ###############

app.put("/", AuthMiddleware, async (req, res) => {

})


module.exports = app;