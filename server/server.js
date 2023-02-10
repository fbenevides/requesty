const express = require("express");
const app = express();
const cors = require("cors");
const Pusher = require("pusher");
require('dotenv').config()
const fs = require('fs');

// Pusher Config
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER
});

// Config database
const users = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Config express
app.use(express.json());
app.use(cors());

app.post("/pusher/channel-auth", async (req, res) => {
  const userId = req.header('X-User-Id')
  
  const user = users[userId];
  if (!user) {
    res.status(401).send({ message: `${userId} is not authorized.` });
    return;
  }

  const authResponse = pusher.authorizeChannel(req.body.socket_id, req.body.channel_name, { user_id: user.id, user_info: user });
  console.log(`POST /pusher/channel-auth | Response: ${JSON.stringify(authResponse)}`);
  res.send(authResponse);
});

app.post("/trigger", async (req, res) => {
  const eventName = req.body.event ? req.body.event : 'message-event';
  const response = await pusher.trigger(req.body.channel, eventName, { message: req.body.message });

  console.log(`POST /trigger | Response: ${JSON.stringify(response)}`);
  res.send({ sent: true });
});

const port = process.env.PORT || 2000;
app.listen(port);