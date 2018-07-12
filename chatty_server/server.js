// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WS      = require('ws');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
function broadcastMessage(message) {
  for (let ws of wss.clients) {
    if (ws.readyState === WS.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }
}

//Sending the incoming message to all the clients
function incoming(message) {
  const msgObj = JSON.parse(message);
  msgObj.id = uuidv1();
  if (msgObj.type === "postMessage") {
    const message = {
      id: msgObj.id,
      username: msgObj.username,
      type: "incomingMessage",
      notification: "",
      content: msgObj.content
    }
    broadcastMessage(message)
  } else {
    const notification = {
      id: msgObj.id,
      type: "incomingNotification",
      username: "",
      notification: msgObj.content,
      content: ""
    }
    broadcastMessage(notification);
  }
}
let count = 0;
//Receive messages:
wss.on('connection', function connection(ws) {
  count++
  console.log('Client connected', count);
  const totalUsers = {type: "Total Users", content: `${count} User(s) Online`};
  broadcastMessage(totalUsers);
  ws.on('message', incoming);
    
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', function close() {
    count--;
    console.log('Client disconnected', count);
    const totalUsersAfterClose = {type: "Total Users", content: `${count} User(s) Online`};
    console.log(totalUsersAfterClose)
    broadcastMessage(totalUsersAfterClose);
  })
  
});