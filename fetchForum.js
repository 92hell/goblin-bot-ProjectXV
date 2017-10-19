const request = require("request");
const config = require("./config.json");
const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const oldPostNumber = config.postNumber;
let currentPostNumber = oldPostNumber;

for (var i = 0; i < 100; i++) {
    currentPostNumber = oldPostNumber+i;
    let url = "https://www.plug.game/kingsraid-en/posts/"+currentPostNumber;
    request({
        url: url,
        json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let newPostNumber = currentPostNumber+1;
                config.postNumber = newPostNumber;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

                var regex = new RegExp('<h3 class="board_name">(.*?)<\/h3>');
                var tag = body.match(regex);
                console.log('Post Number '+currentPostNumber+' Tagged '+tag[1]); // Print the json response

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
        }
    );
}
console.log('Checked post number #'+oldPostNumber+' until post number #'+currentPostNumber);