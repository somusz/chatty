// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  newUser = {
    message: { type : 'log' },
    count: wss.clients.size
  }

  wss.broadcast(newUser)

  ws._ultron.color = `#${Math.floor(Math.random()*16777215).toString(16)}`

  ws.on('message', function (messageIn) {
    const messageParsed = JSON.parse(messageIn)

    const findColor = (user) => {
      return user.userID === messageIn.userID
    }

    messageParsed.message.color = ws._ultron.color
    messageParsed.message.key = uuidv4()

    wss.broadcast(messageParsed)
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




