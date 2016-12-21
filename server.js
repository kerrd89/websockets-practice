'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const votes = {};
const _ = require('lodash');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

var server = http.createServer(app);
const io = socketIo(server);

function countVotes(votes) {
  var voteCount = { A: 0, B: 0, C: 0, D: 0 };
  for (var vote in votes) {
    voteCount[votes[vote]]++;
  }
  return voteCount;
}

server.listen(port, () => {
  console.log('Listening on port ' + port + '.');
});

io.on('connection', (socket) => {
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', (channel, message) => {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      socket.emit('voteMessage', `You voted for ${message}`);
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = server;
