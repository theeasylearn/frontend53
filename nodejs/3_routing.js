// simple example of CRUD operation
// C = Create (insert)
// R = Read (select)
// U = Update 
// D = Delete
var express = require('express')
var bodyParser = require('body-parser');
var data = []; //empty list 
var app = express();
//below lines are required to accept input submitted with post/put/delete method
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ROUTE = "/contact";
app.get(ROUTE, function (request, response) {
    response.json(data);
});

//curl -X POST http://localhost:5000/contact
app.post(ROUTE, function (request, response) {
    var email = request.body.email;
    var mobile = request.body.mobile;
    var name = request.body.name;
    if (email === undefined || mobile === undefined || name === undefined) {
        response.send('input missing');
    }
    else {
        //create object
        var object = { 'email': email, 'mobile': mobile, 'name': name };
        data.push(object); //insert object into list
        response.send('contact saved successfully');
    }

});

// curl -X PUT http://localhost:5000/contact
app.put(ROUTE, function (request, response) {
    var email = request.body.email;
    var mobile = request.body.mobile;
    var name = request.body.name;
    if (email === undefined || mobile === undefined || name === undefined) {
        response.send('input missing');
    }
    else {
        var isFound = false;
        data = data.map((item) => {
            if (item.name === name) {
                isFound = true;

                return {
                    email: email,
                    mobile: mobile,
                    name: name
                };
            }

            return item;
        });
        if (isFound === true)
            response.send("Contact has been updated successfully");
        else
            response.send("Contact not found");
    }

});

//curl -X DELETE http://localhost:5000/contact
app.delete(ROUTE, function (request, response) {
    var name = request.body.name;
    var isFound = false;
    if (name === undefined) {
        response.send('input missing');
    }
    else {
        data = data.filter((item) => {
            if (item.name !== name)
                return item;
            else
                isFound = true;
        });
        if (isFound === true)
            response.send("Contact has been deleted successfully");
        else
            response.send("Contact not found");
    }

});

const portno = 5000;
app.listen(portno, function (error) {
    if (error)
        console.log(error);
    else
        console.log("ready to accept request...");
});