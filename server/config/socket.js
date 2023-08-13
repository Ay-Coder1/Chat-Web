const { Server } = require('socket.io');

let io;

const createSocketServer = server => {
   io = new Server(server, {
     cors: {
       origin: "https://chat-web-rose.vercel.app",
       methods: ["GET", "POST", "PATCH", "DELETE"],
     },
   });

   return io;
};

module.exports = { createSocketServer, io };
