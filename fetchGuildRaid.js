const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const color_hex = 0x289118;

if(config.suicide){
	client.guilds.find('name', 'ProjectXV').channels.find('name', 'guild_chat').send({embed: {
  		color: color_hex,
  		title: "Time for Suicide Run",
  		description: "Friendly Reminder for @everyone to Do Suicide Run on Guild Raid until Sunday! Suicide Run is just doing guild raid with only one char to leech guild points and not to kill the boss."
	}});
}
if(config.kill){
	client.guilds.find('name', 'ProjectXV').channels.find('name', 'guild_chat').send({embed: {
  		color: color_hex,
  		title: "Kill the Manticore",
  		description: "It is Sunday, Time for Us to Kill the Manticore. No More Holding Back, @everyone Charge!!!!"
	}});
}