var http = require('http');
var fs = require('fs');
var url = require('url');
/*
    http://localhost:5000/about.html -> about.html
    http://localhost:5000/products.html -> product.html
    http://localhost:5000/services.html -> services.html
    http://localhost:5000/contact.html -> contact.html
*/
// create server 
// read file synchronously
var errorFile = fs.readFileSync('404.html');
var server = http.createServer(function (request, response) {
    var query = url.parse(request.url);
    console.log(query.pathname);
    var filename = "." + query.pathname;
    //console.log(filename);
    //read file asynchronously 
    if (query.pathname === "/save_contact" && request.method === "POST") {

        var input = "";
        filename = "./contact.html";
        // Receive data
        request.on("data", function (submittedData) {
            input += submittedData.toString();
        });

        // All data received
        request.on("end", function () {
            // console.log("Raw data:");
            // console.log(input);
            var data = new URLSearchParams(input);
            var name = data.get("name");
            var email = data.get("email");
            var interest = data.get("interest");
            var message = data.get("message");

            var fileName2 = "inquiry.txt";
            var content = `Name = ${name} email = ${email} interest = ${interest} message = ${message} \n`;
            fs.appendFile(fileName2, content, function (error) {

            });
        });
    }

    fs.readFile(filename, function (error, content) {
        console.log(error);
        if (error !== null) {
            //file can not be read 
            response.writeHead(404, { 'content-type': 'text/html' });
            response.write(errorFile);
        }
        else {
            response.writeHead(200, { 'content-type': 'text/html' });
            response.write(content);
        }
        return response.end();
    });

});

var portno = 5000;
server.listen(5000);
console.log('server is started....');