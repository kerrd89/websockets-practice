'use strict';

const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen(port, () => {
  console.log('Listening on port ' + port + '.');
});

module.exports = server;
