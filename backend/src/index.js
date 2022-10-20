const express = require("express");
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io");
const chats = require("./data");
const Connect = require("./config/db");
const userRouter = require("./user/user.router")
require('dotenv').config()
const PORT = process.env.PORT

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(cors())
app.use(express.json())
app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.get("/chat", (req, res) => {
    res.send(chats)
})

app.get("/chat/:id", (req, res) => {
    const { id } = req.params
    const singleChat = chats.find((el) => el._id === id);
    res.send(singleChat)
})

io.on("connection", (socket) => {
    console.log("New Connection")

    socket.on("joined", (data) => {
        console.log("new user", data)
    })
})


server.listen(PORT, async () => {
    await Connect()
    console.log(`Server is running on port ${PORT}`)
})

