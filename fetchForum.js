const request = require("request");
const postNumber = 4610;
const url = "https://www.plug.game/kingsraid-en/posts/"+postNumber;

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
    	var regex = new RegExp('<h3 class="board_name">(.*?)<\/h3>');
        var tag = body.match(regex);
        console.log(tag[1]) // Print the json response
    }
});