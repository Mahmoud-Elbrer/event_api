
module.exports = function (io) {
  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    console.log(username);
    socket.on("changeStatus", (data) => {
      console.log("i am here 2");
  
      const body = {
        orderId: data.orderId,
        itemId: data.itemId,
        status: data.status,
      };
      console.log(body);
      io.emit("changeStatus", body);
    });
  });
}

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// io.on("connection", (socket) => {
//   const username = socket.handshake.query.username;
//   console.log(username);
//   socket.on("changeStatus", (data) => {
//     console.log("i am here 2");

//     const body = {
//       orderId: data.orderId,
//       itemId: data.itemId,
//       status: data.status,
//     };
//     io.emit("changeStatus", body);
//   });
// });

// server.listen(4000, () => {
//   console.log("listening on *:4000");
// });
