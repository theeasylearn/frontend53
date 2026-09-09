// localhost:5000 then it should return all continents (asia europe etc)
// localhost:5000/asia then it should return few countries of asia 
// localhost:5000/europe then it should return few countries of europe 
var http = require("http");

//create server 
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'content-type': 'html' });
    if (request.url == "/") {
        response.write("<!DOCTYPE html><html><head><title>Continents by Size</title></head><body><h1>Continents by Size</h1><ol><li>Asia</li><li>Africa</li><li>North America</li><li>South America</li><li>Antarctica</li><li>Europe</li><li>Australia</li></ol></body></html>");
    }
    else if (request.url == "/asia") {
        response.write("<!DOCTYPE html><html><head><title>Asian Countries</title></head><body><h1>Asian Countries</h1><ol><li>India</li><li>China</li><li>Japan</li><li>Nepal</li><li>Bhutan</li><li>Bangladesh</li><li>Pakistan</li><li>Sri Lanka</li><li>Thailand</li><li>Indonesia</li></ol></body></html>");
    }
    else if (request.url == "/europe") {
        response.write("<!DOCTYPE html><html><head><title>European Countries</title></head><body><h1>European Countries</h1><ol><li>Germany</li><li>France</li><li>Italy</li><li>Spain</li><li>United Kingdom</li><li>Portugal</li><li>Netherlands</li><li>Switzerland</li><li>Norway</li><li>Sweden</li></ol></body></html>");
    }
    else 
    {
          response.write("<!DOCTYPE html><html><head><title>Not found</title></head><body><h1>Not found</h1></body></html>");
    }
    response.end();
});


//start server 
const portno = 5000;
server.listen(portno);
console.log('ready to accept request');


