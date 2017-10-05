const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot){
		console.log("not started with prefix "+config.prefix);
		return;	
	} 
	
	if (message.content.startsWith(config.prefix+"god")) {
		message.channel.send("Lakrak is our god and saviour!");
	}

	if (message.content.startsWith(config.prefix+"gr")) {
		message.channel.send("Do ***Suicide Squad*** on Guild Raid until **Saturday**!");
	}

	if (message.content.startsWith(config.prefix+"kill")) {
		message.channel.send("Kill the Manticore Now!");
	}

	if (message.content.startsWith(config.prefix+"test")) {
		message.channel.send("test confirmed");
	}
});

client.login(config.token);