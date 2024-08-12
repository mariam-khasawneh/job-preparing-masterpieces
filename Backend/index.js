const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors"); // to enable cross origi requests

const io = require("socket.io")(server, {
  cors: {
    origin: "*", // alloes access from all origins
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("server is listening :)"));

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

// start the server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
