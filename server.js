'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

var server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => {
  console.log('Listening on port ' + port + '.');
});

io.on('connection', (socket) => {
  console.log('A user has connected', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  
  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = server;
