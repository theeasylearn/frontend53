var http = require('http');
var fs = require('fs');

// create server 
var server = http.createServer(function(request,response){
    var fileName = "sample_site.html";
    fs.readFile(fileName,function(error,content){
        response.writeHead(200,{'content-type':'text/html'});
        response.write(content);
        return response.end();
    });
});
server.listen(5000);
console.log("server is started.....");