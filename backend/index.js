const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

io.on("connection", socket => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
