var express = require('express');
var fs = require('fs');

var app = express();
//define route 
app.get("/", function (request, response) {
    fs.readFile("index.html", function (error, content) {
        response.send(content.toString());
    });
});
app.get("/aboutus", function (request, response) {
    fs.readFile("about.html", function (error, content) {
        response.send(content.toString());
    });
});
app.get("/products", function (request, response) {
    fs.readFile("products.html", function (error, content) {
        response.send(content.toString());
    });
});
app.get("/services", function (request, response) {
    fs.readFile("services.html", function (error, content) {
        response.send(content.toString());
    });
});
app.get("/contactus", function (request, response) {
    fs.readFile("contact.html", function (error, content) {
        response.send(content.toString());
    });
});
//request for non existing page will be handled function below function
app.use(function (request, response) {
    fs.readFile("404.html", function (error, content) {
        response.send(content.toString());
    });
});

app.listen(5000);
console.log('ready to accept request');