var url = require('url');
var http = require('http');
//http://localhost:5000/?num1=100&num2=500
// create function that accept request
function handleRequest(request,response)
{
    // console.log('I have received request');
    var url_data = url.parse(request.url,true);
    // console.log(url_data);
    var query = url_data.query;
    // console.log(query.num1);
    // console.log(query.num2);
    var message = '';
    if(query.num1 === undefined || query.num2 === undefined)
    {
        message = "input is missing";
    }
    else 
    {
        //also return result of subtraction, multiplication & division
        let result = parseInt(query.num1) + parseInt(query.num2);
        message = `addition = ${result}`;
    }
    response.writeHead(200,{'content-type':'text/html'});
    response.write(message);
    return response.end();
}
var server = http.createServer((request,response) => handleRequest(request,response));
var portno = 5000;
server.listen(portno);
console.log("server started....");