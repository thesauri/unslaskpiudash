const api = () => {
    const webSocket = new WebSocket("ws://localhost:8080")
    let onNewCard = () => { console.error("Call onNewCard first!"); };
    let onNewPlayers = () => { console.error("Call onNewPlayers first!"); };
    let onNewCurrentPlayer = () => { console.error("Call onNewCurrentPlayer first!"); };
    webSocket.onmessage = (event) => {
        console.log(event)
        try {
            const data = JSON.parse(event.data)
            if (data.action === "setNewCard") {
                onNewCard(data.newCard)
            } else if (data.action === "setPlayers") {
                onNewPlayers(data.players);
            } else if (data.action === "setCurrentPlayer") {
                console.log("Yey!");
                onNewCurrentPlayer(data.currentPlayer);
            }
        } catch(error) {
            console.log(error)
        }
    };
    return {
        onNewCard: (onNewCardFunc) => { onNewCard = onNewCardFunc; },
        onNewPlayers: (onNewPlayersFunc) => { onNewPlayers = onNewPlayersFunc; },
        onNewCurrentPlayer: (onNewCurrentPlayerFunc) => { onNewCurrentPlayer = onNewCurrentPlayerFunc; },
        requestNextCard: () => webSocket.send(JSON.stringify({action: "nextCard" })),
        requestNextPlayer: () => webSocket.send(JSON.stringify({action: "nextPlayer" })),
        setName: (name) => webSocket.send(JSON.stringify({ action: "setName", name: name }))
    };
}

export default api();
