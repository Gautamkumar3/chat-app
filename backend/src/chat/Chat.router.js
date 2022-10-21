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

app.get("/a", AuthMiddleware, async (req, res) => {
    try {
        await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (response) => {
                const results = await User.populate(response, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results)
            })
    } catch (er) {
        res.status(400).send(er.message)
    }

})

// ################## for createGroup  ###############
// in body users "users":"[\"6351652f35f1f07261aeccd3\",\"635165b140f485e7d32880ac\"]"

app.post("/group", AuthMiddleware, async (req, res) => {
    const { users, name } = req.body;
    if (!users || !name) {
        return res.status(400).send({ msg: "All fields are required" })
    }

    var Users = JSON.parse(req.body.users);
    if (Users.length < 2) {
        return res.status(400).send("Minimum 2 users required for create a group")
    }

    Users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: Users,
            isGroupchat: true,
            groupAdmin: req.user
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password");
        res.status(200).send(fullGroupChat)
    } catch (er) {
        res.status(400).send(er.message)
    }
})

// ################## for rename group ###############

app.put("/rename", AuthMiddleware, async (req, res) => {
    const { chatId, chatName } = req.body;
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");

        if (updatedChat) {
            res.status(200).send(updatedChat)
        } else {
            res.status(400).send("Groupname not updated")
        }
    } catch (er) {
        res.status(401).send(er.message)
    }


})

// ################## for add group ###############
// If user was admin then only he can add people into the group
app.put("/addgroup", AuthMiddleware, async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const UserAdded = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (UserAdded) {
            res.status(200).send(UserAdded)
        } else {
            res.status(401).send("User not added something went wrong")
        }
    } catch (er) {
        res.status(401).send(er.message)
    }
})

// ################## for remove group ###############
// If user was admin then only he can remove people into the group
app.put("/removegroup", AuthMiddleware, async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const UserRemoved = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (UserRemoved) {
            res.status(200).send(UserRemoved)
        } else {
            res.status(401).send("User not removed Something went wrong")
        }
    } catch (er) {
        res.status(401).send(er.message)
    }
})




module.exports = app;