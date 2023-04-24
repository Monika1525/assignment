const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dbConnection = require("./config/db.config");
const chat = require("./models/chat.model");
const io = new Server(server);
app.use("/", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/chat/:roomId", async (req, res) => {
  const chats = await chat.find({ roomId: req.params.roomId });

  res.render("index", {
    name: "Girish",
    roomId: req.params.roomId,
    chats: chats,
  });
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("User joined to room Id", data.roomId);
    socket.join(data.roomId);
  });

  socket.on("msgSent", async (data) => {
    await chat.create({
      content: data.msg,
      user: data.userName,
      roomId: data.roomId,
    });

    console.log(data);
    io.to(data.roomId).emit("msg_rcvd", {
      msg: data.msg,
      userName: data.userName,
    });
  });
});

server.listen(3000, async () => {
  console.log("Server is listening on port 3000");
  await dbConnection();
});
