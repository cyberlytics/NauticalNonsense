const express = require('express');
const WebSocket = require('ws');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const wsServer = new WebSocket.Server({
  port: 8000
});
wsServer.on("connection", function connection(ws) {
  console.log("connection established");
  ws.on('error', console.error);
  ws.on('message', data => {
    console.log(data);
    // react on messages

    // if received message is a fire shot, return a won object
    // expects something like this: {"Fire":53,"GameID":"8ab90b66-1921-4ea1-9bb0-b17a35afe46e"}
    // frontend normally receives something like this: {"message": {"Fire": 53, "GameID": "8ab90b66-1921-4ea1-9bb0-b17a35afe46e", "lose": false, "hit": true, "board": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}}

    // on victory this is expected: {"message": {"Fire": 15, "GameID": "8ab90b66-1921-4ea1-9bb0-b17a35afe46e", "lose": "40703f36-f1b8-47be-966b-e170668bfedd", "hit": true, "board": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}}

    let msg = JSON.parse(data.data)
    console.log(msg);
    if (msg.message.Fire != undefined) {
      console.log("in If not undefined:");
      console.log(msg.message.Fire);

      ws.send(JSON.stringify({
        "message":
        {
          "Fire": 15,
          "GameID": "8ab90b66-1921-4ea1-9bb0-b17a35afe46e",
          "lose": "40703f36-f1b8-47be-966b-e170668bfedd",
          "hit": true,
          "board": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      }));
    };
    
  });
  // signal frontend, that there is already a player
  ws.send(JSON.stringify({"message": "ready"}));

  // signal frontend, that the opponent has already placed his ships and its your turn to shoot
  ws.send(JSON.stringify({
    "message": {
      "Shiplist": [
        [31, 41, 51, 61],
        [11, 12, 13, 14, 15],
        [33, 43, 53],
        [71, 81],
        [45, 46],
        [30],
        [34]
      ],
      "GameID": "8ab90b66-1921-4ea1-9bb0-b17a35afe46e",
      "message": [
        "ship_placement_ready",
        "4b53184c-2ac9-4dbb-9afb-3866e9cdbdd8"
      ]
    }
  }));
});