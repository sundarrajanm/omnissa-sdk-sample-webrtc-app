/*
 * Copyright (c) Omnissa, LLC. All rights reserved.
 * This product is protected by copyright and intellectual property laws in the
 * United States and other countries as well as by international treaties.
 * -- Omnissa Restricted
 */

const express = require("express");
const path = require('path');
const User = require("./user");
const MessageType = require("../public/common/constant");
const WebSocket = require("ws");

const port = process.env.PORT || 8443;
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

const userMap = new Map();

wss.on("connection", function(ws) {
   console.log("client connected");

   ws.on("message", function incoming(message) {
		let msg;
		try {
			msg = JSON.parse(message);
		} catch (error) {
			console.log(error);
			console.log("WSS ==> Received invailid format of message: " + message);
			return;
		}

      let userId = msg.userId;
      let msgId = msg.id;
		let messageType = msg.messageType;
      console.log("WSS ==> received message from client: " +  userId + ", message type: " + msg.messageType);
		let user = userMap.get(userId);
		if (!user || messageType === MessageType.LOGIN) {
			if (user) {	// replace the old client with new one
				console.log("WSS ==> Duplicated client connected with id: " +  userId + ", disconnect the old one.");
				user.ws.close();
				userMap.delete(userId);
			}

			user = new User(userId, ws, userMap);
			userMap.set(userId, user);
		}
		user.handleMsg(msg);
   });

   ws.on("close", function close() {
      userMap.forEach((userWS, userId) => {
         if (userWS === ws) {
            userMap.delete(userId);
            console.log("WSS ==> client: " + userId + ", disconnected");
         }
      });
   });

   ws.on("error", function error(e) {
      console.error("WSS ==> on Web Socket error:" + e);
   });
});
