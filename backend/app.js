const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const numberOfCards = 19;
let currentCard = 0;
let players = [];
let currentPlayer = 0;

wss.on('connection', function connection(ws) {
  let name = "";
  ws.on('message', function incoming(messageData) {
    const message = JSON.parse(messageData);
    console.log(message)
    if (message.action === "nextCard") {
      currentCard = Math.floor(numberOfCards * Math.random())
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: "setNewCard",
            newCard: currentCard
          }))
        }
      });
    } else if (message.action === "setName") {
      if (!players.find(player => player === message.name)) {
        players.push(message.name)
      }
      name = message.name;
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: "setPlayers",
            players: players
          }))
        }
      });
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: "setCurrentPlayer",
            currentPlayer: players[currentPlayer]
          }))
        }
      });
    } else if (message.action === "nextPlayer") {
      currentPlayer = (currentPlayer + 1) % players.length;
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: "setCurrentPlayer",
            currentPlayer: players[currentPlayer]
          }))
        }
      });
    }
    console.log('received: %s', message);
  });
  ws.on("close", function close(ws) {
    console.log(`Client ${name} closed`);
    if (players.findIndex(player => player === name) === currentPlayer) {
      currentPlayer = (currentPlayer + 1) % players.length;
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: "setCurrentPlayer",
            currentPlayer: players[currentPlayer]
          }))
        }
      });
    }
    players = players.filter(player => player !== name);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          action: "setPlayers",
          players: players
        }))
      }
    });
  });
});