const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  port: 8800,
});

wss.on("connection", function connection(ws) {
  ws.on("message", function message(rawData) {
    console.log("received: %s", rawData);
    const msg = rawData.toString();
    if (msg === "hello") {
      ws.send("world");
    } else if (msg === "foo") {
      ws.send("bar");
    }
  });
});
