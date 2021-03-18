const WebSocket = require("ws");

const server = new WebSocket.Server({
	port: 8080,
});

let sockets = [];

let connection = -1;

server.on("connection", (socket) => {
	console.log("Socket Connected");
	connection++;
	socket.send(connection);
	sockets.push([socket, connection]);
	socket.on("message", (msg) => {
		msg = msg.split(",");
		msg = JSON.stringify(msg);
		sockets.forEach((s) => s[0].send(msg));
	});

	socket.on("close", () => {
		console.log("Socket Closed");
		sockets = sockets.filter((socketFromArray) => socket !== socketFromArray);
	});
});
