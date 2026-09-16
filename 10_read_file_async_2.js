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
var server = http.createServer(function(request,response){
    var query = url.parse(request.url);
    //console.log(query);
    var filename = "." + query.pathname;
    //console.log(filename);
    //read file asynchronously 
    fs.readFile(filename,function(error,content){
        console.log(error); 
        if(error !== null)
        {
            //file can not be read 
            response.writeHead(404,{'content-type':'text/html'});
            response.write(errorFile);
        }
        else 
        {
            response.writeHead(200,{'content-type':'text/html'});
            response.write(content);
        }
        return response.end();
    });
});

var portno = 5000;
server.listen(5000);
console.log('server is started....');