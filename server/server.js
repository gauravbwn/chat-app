const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utility/message');
const {isValidString} = require('./utility/validation');
const {Users} = require('./utility/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if(!isValidString(params.name) || !isValidString(params.room)) {
      return callback('not a valid display name or room');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id);
      if(user && isValidString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      }

      callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
})

server.listen(port, () => {
  console.log(`serve is listening on port ${port}`);
});
