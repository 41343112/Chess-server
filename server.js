const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });
const rooms = {};

wss.on('connection', ws => {
    let currentRoom = null;
    ws.on('message', message => {
        let msg = JSON.parse(message);
        if (msg.action === "join") {
            currentRoom = msg.room;
            if (!rooms[currentRoom]) rooms[currentRoom] = [];
            rooms[currentRoom].push(ws);
        } else if (msg.action === "move" && currentRoom) {
            rooms[currentRoom].forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(msg));
                }
            });
        }
    });
    ws.on('close', () => {
        if (currentRoom && rooms[currentRoom]) {
            rooms[currentRoom] = rooms[currentRoom].filter(c => c !== ws);
            if (rooms[currentRoom].length === 0) delete rooms[currentRoom];
        }
    });
});
console.log("WebSocket server running");
