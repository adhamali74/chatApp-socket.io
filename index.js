/** @format */
const express = require("express");
const { join } = require("node:path");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected with socket id:", socket.id);
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("Send_Messages_to_all", msg);
  });
  socket.on("typing", () => {
    socket.broadcast.emit("show_typing_status");
  });
  socket.on("stop_typing", () => {
    socket.broadcast.emit("clear_typing_status");
  });
});

server.listen("3000", () => {
  console.log("listening on port 3000");
});
