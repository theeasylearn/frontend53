var http = require('http');

var count = 0;

//create function to accept request
var server = http.createServer(function(request,response){
    //this function will run for each and every request received by server 
    count = count + 1;
    console.log(`I have received request for ${count}`);
});

//start server 
const portno = 5000;
server.listen(portno);
console.log('ready to accept request');

