const http = require('http');
const express = require('express');
const fs = require('fs');
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
const prefix  = config.prefix;
const color_hex = 0x289118;

client.on("ready", () => {
	client.user.setGame(prefix+'help');
	console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot){
		return;	
	}

	if(message.content.startsWith(prefix)){
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		if (command === "god"){
			message.channel.send({embed: {
  				color: color_hex,
  				description: "Lakrak is our god and saviour!"
			}});
		}

		if (command === "gr") {
			message.channel.send({embed: {
  				color: color_hex,
  				title: "Time for Suicide Run",
  				description: "Friendly Reminder for @everyone to Do Suicide Run on Guild Raid until Sunday! Suicide Run is just doing guild raid with only one char to leech guild points and not to kill the boss."
			}});
		}

		if (command === "kill") {
			message.channel.send({embed: {
  				color: color_hex,
  				description: "Kill the Manticore Now!"
			}});
		}

		if (command === "test") {
			message.channel.send({embed: {
  				color: color_hex,
  				description: "test confirmed"
			}});
		}

		if (command === "help") {
			message.channel.send(
				{
					embed: {
						color: color_hex,
						author: {
							name: client.user.username,
							icon_url: client.user.avatarURL
						},
						title: "Bot Command List",
						description: "This is a list of command that is available for bots to use and their respective message or function use prefix "+prefix,
						fields: [
							{
								name: prefix+"god",
								value: "Reminder who is our god"
							},
							{
								name: prefix+"gr",
								value: "Reminder for doing suicide run on guild raid"
							},
							{
								name: prefix+"kill",
								value: "Reminder for killing the boss"
							},
							{
								name: prefix+"test",
								value: "Bots will check if your message is accepted to the server"
							},
							{
								name: prefix+"help",
								value: "List of Command for Bot"
							}
						],
    					timestamp: new Date(),
    					footer: {
      						icon_url: client.user.avatarURL,
      						text: "© Goblin Bot & Discord.js"
    					}
  					}
				}
			);
		}
	} 
});

client.on("guildMemberAdd", (member) => {
  console.log('New User '+member.user.username+' has joined '+member.guild.name);
  const channel = member.guild.channels.find('name', 'guild_chat');
  if(!channel) return;
  channel.send(member.user.username+' has joined our guild! Welcome to our humble home!');
});

function fetchForum = () => {
	const request = require("request");
	const postNumber = config.postNumber;
	const url = "https://www.plug.game/kingsraid-en/posts/"+postNumber;

	request({
    	url: url,
    	json: true
		}, function (error, response, body) {
    		if (!error && response.statusCode === 200) {
    			let newPostNumber = postNumber+1;
    			config.postNumber = newPostNumber;
    			fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

    			var regex = new RegExp('<h3 class="board_name">(.*?)<\/h3>');
        		var tag = body.match(regex);
        		console.log('Post Number '+postNumber+' Tagged '+tag[1]); // Print the json response

        		var postType = tag[1];

        		const guild = client.guilds.find('name', 'ProjectXV');
        		if(postType === 'Notices'){
        			guild.channels.find('name', 'news').send(url);
        		}
        		if(postType === 'Patch Note'){
        			guild.channels.find('name', 'news').send(url);
        		}
        		if(postType === 'Events'){
        			guild.channels.find('name', 'events').send(url);
        		}
    		}
    		else{
    			console.log('no new post');
    		}
		}
	);
};

setInterval(fetchForum, 60000);

client.login(config.token);