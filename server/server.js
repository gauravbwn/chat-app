const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMessage', (message) => {
      console.log("some important message: ", message);
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      })
  });

  socket.on('disconnect', () => {
    console.log('lost a user');
  });
})

server.listen(port, () => {
  console.log(`serve is listening on port ${port}`);
});
