var http = require("http");

//create server 
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'content-type': 'application/json' });
    if (request.url == "/info") {
        var data = JSON.stringify({
            name : "the easylearn academy",
            course : "MERN",
            duration : 180,
            fees : 50000
        });
        response.write(data);
    }
    response.end();
});


//start server 
const portno = 5000;
server.listen(portno);
console.log('ready to accept request');


