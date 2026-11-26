var express = require('express')
var app = express();
//define middleware

app.use(function(request,response,next){
    console.log("I am first middleware function");
    next();
});

app.use(function(request,response,next){
    console.log("I am second middleware function");
    next();
});

app.get("/home",function(request,response){
    response.send("this is home page");
});

app.get("/products",function(request,response){
    response.send("this is product page");
});

app.get("/services",function(request,response){
    response.send("this is service page");
});

app.listen(5000);
console.log("ready to accept request");


