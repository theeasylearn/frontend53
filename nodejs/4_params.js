var express = require('express');
var app = express();
// define route for addition
// localhost:5000/add/10/3
app.get("/add/:num1/:num2",(request,response) => {
    //accessing input submitted with request (query string)
    let num1 = request.params.num1;
    let num2 = request.params.num2;
    let addition = parseInt(num1) + parseInt(num2);
    //return response to client
    response.send("addition = " + addition);
});

app.use((request,response) => {
    response.status(404).send("no such page found");
});
app.listen(5000);
console.log("ready to accept request");
