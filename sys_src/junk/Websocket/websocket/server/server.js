var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});

console.log('Server started on 8080');

var
  rabbit = {x:0, y:0};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        var incommingMsg = JSON.parse(message);
        rabbit.x = incommingMsg.x;
        rabbit.y = incommingMsg.y;
        console.log(incommingMsg.x);
        console.log(incommingMsg.y);
        var clients = wss.clients;
        for (var client of clients) {
            client.send(JSON.stringify(rabbit));
        }
    });
    ws.send(JSON.stringify(rabbit));
    
    
});