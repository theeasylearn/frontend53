var http = require('http');
var event = require('events');
var url = require('url');

// http:localhost:5000/product?name=iphone&quantity=1
// http:localhost:5000/product?name=macbook&quantity=2
// create Event Emitter object
var em = new event.EventEmitter();
var RegisterOrder = function (name, quantity) {
    console.log("Order received for ", name, quantity);
}
var CourierInfo = function (name, quantity = null) {
    console.log("Courier team has been informed for ", name);
}
//create function that will run when order is received
em.addListener("order",RegisterOrder);
em.on("order",CourierInfo);
// create server 
var server = http.createServer(function (request, response) {
    var url_data = url.parse(request.url, true);
    //console.log(url_data);
    var input = url_data.query; //to access input name=iphone&quantity=1
    var path = url_data.pathname;
    if (path === '/product' && input.name !== undefined && input.quantity !== undefined) {
        console.log("received request for product with name and quantity");
        em.emit("order", input.name, input.quantity);
        em.removeListener("order",RegisterOrder);
        em.removeListener("order",CourierInfo);
    }
    else {
        console.log("invalid request");
    }
});
server.listen(5000);
console.log('ready to accept request');

