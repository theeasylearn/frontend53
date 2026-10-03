var express = require('express');
var fs = require('fs');
var app = express();
//define middleware

app.use(function (request, response, next) {
    // create Date object
    var now = new Date();
    var hours = now.getHours(); //hours of current time;
    if (hours < 8 || hours > 22) {
        response.send("sorry, we can not process your request at this time. our working hours are 8:00 AM to 08:00 PM");
    }
    else
        next();
});


app.use(function (request, response, next) {
    var now = new Date();
    var current_date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
    var current_time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    console.log(current_date, current_time);
    var method = request.method;
    var route = request.url;
    console.log(method, route);
    const ip = request.ip;
    var msg = `\n${route} ${method} ${current_date} ${current_time} ip = ${ip}`;
    console.log(msg);
    fs.appendFile('access.log', msg, function (error) {
        if (error)
            console.log('error in writing into console file');
    });
    next();
});

app.get("/home", function (request, response) {
    response.send("this is home page");
});

app.get("/products", function (request, response) {
    response.send("this is product page");
});

app.get("/services", function (request, response) {
    response.send("this is service page");
});

app.listen(5000);
console.log("ready to accept request");


