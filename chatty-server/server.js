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

//broadcast data to all open clients as JSON
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

//events on connection
wss.on('connection', (ws) => {
  console.log('Client connected');

//upon connection of a new user, the overall count of users are broadcasted
  newUser = {
    message: { type : 'log' },
    count: wss.clients.size
  }

  wss.broadcast(newUser)

//setting a random color to users through manipulating websocket properties
  ws._ultron.color = `#${Math.floor(Math.random()*16777215).toString(16)}`

//events upon messages coming into the server
  ws.on('message', function (messageIn) {

//function checks the content if it's an image
    const contentChecker = (message) => {

      const messageParsed = JSON.parse(message)
      const messageOut = messageParsed
      const regex = /(http(s)?:(\S+)\.(jpg|png|gif)$)/g;
      let matches = regex.exec(messageParsed.message.content)


//the outgoing message carries the users' assigned color and a unique key
      messageOut.message.color = ws._ultron.color
      messageOut.message.key = uuidv4()

//if the input message is an image, a new html element is created and passed along while the non-image string remains
      if (matches) {
        messageOut.message.image = `<img class="message-image" src="${matches[1]}" alt="" />`
        messageOut.message.content = messageOut.message.content.replace(matches[1],'')
      }

      return messageOut
    }

//broadcast and the contentChecker functions are called on the incoming message
    wss.broadcast(contentChecker(messageIn))
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




