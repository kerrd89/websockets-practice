'use strict';
const socket = io();
const connectionCount = document.getElementById('connection-count');
const statusMessage = document.getElementById('status-message');
const voteMessage = document.getElementById('vote-message');
const buttons = document.querySelectorAll('#choices button');
const voteResults = document.querySelectorAll('#vote-count li');
const displayResults = document.querySelectorAll('#vote-count div');

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

socket.on('voteMessage', (message) => {
  voteMessage.innerText = message;
});

socket.on('voteCount', function(votes) {
  let array = Object.keys(votes);
  for (var i = 0; i < voteResults.length; i++) {
    voteResults[i].innerText = array[i] + ': ' + votes[array[i]];
    displayResults[i].style.width = (votes[array[i]] * 10) + 'px';
  }
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}
