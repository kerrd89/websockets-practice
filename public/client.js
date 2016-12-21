'use strict';
const socket = io();
const connectionCount = document.getElementById('connection-count');
const statusMessage = document.getElementById('status-message');
const buttons = document.querySelectorAll('#choices button');
const voteResults = document.querySelectorAll('#vote-count li');

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

socket.on('voteCount', function(votes) {
  let array = Object.keys(votes);
  for (var i = 0; i < voteResults.length; i++) {
    voteResults[i].innerText = array[i] + ': ' + votes[array[i]];
  }
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}
