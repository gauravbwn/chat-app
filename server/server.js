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

  socket.emit('newMessage', {
    'from': 'abc@example.com',
    'text': 'a secret message',
    'createdAt': 1234323
  });

  socket.on('createMessage', (message) => {
      console.log("some important message: ", message);
  });

  socket.on('disconnect', () => {
    console.log('lost a user');
  });
})

server.listen(port, () => {
  console.log(`serve is listening on port ${port}`);
});
