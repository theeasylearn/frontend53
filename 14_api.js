// simple example of CRUD operation
// C = Create (insert)
// R = Read (select)
// U = Update 
// D = Delete
var express = require('express')
var bodyParser = require('body-parser');
var connection = require("./connection.js");
var pwd = require("./password.js");
var data = []; //empty list 
var app = express();
//below lines are required to accept input submitted with post/put/delete method
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const ROUTE = "/users";
//check email and password is found in table or not
//curl -X POST http://localhost:5000/users/login
// require input : email and password
app.post(ROUTE + "/login", function (request, response) {
    // console.log(request.body.email);
    // console.log(request.body.password);
    var email = request.body.email;
    var password = request.body.password;
    if (email === undefined || password === undefined) {
        response.json([{ 'error': 'input is missing' }])
    }
    else {
        var sql = "select id, password from users where email = ?";
        var values = [email];
        connection.con.query(sql, values, function (error, result) {
            if (error != null) {
                response.json([{ 'error': 'opps something went wrong' }]);
                console.log(error);
            }
            else {
                // console.log(result.length);
                if (result.length === 0) {
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid email address' }]);
                }
                else {
                    var hashed_password = result[0]['password'];
                    pwd.comparePassword(hashed_password, password).then((isMatched) => {
                        if (isMatched === true) {
                            response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'login successful' }, { 'id': result[0]['id'] }]);
                        }
                        else {
                            response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid password' }]);
                        }
                    })

                }
            }
        });
    }
});

//curl -X POST http://localhost:5000/users
app.post(ROUTE, function (request, response) {
    var email = request.body.email;
    var mobile = request.body.mobile;
    var password = request.body.password;
    if (email === undefined || mobile === undefined || password === undefined) {
        response.json([{ 'error': 'input missing' }])
    }
    else {
        //password hash
        pwd.hashPassword(password).then((NewHashedPassword) => {
            var sql = "insert into users (email,mobile,password) values (?,?,?)";
            // ? placeholder
            values = [email, mobile, NewHashedPassword];
            connection.con.query(sql, values, function (error, result) {
                if (error) {

                    console.log(error);
                    if (error.errno === 1062) {
                        response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'either email or mobile is already registered. both must not be previously used.' }]);
                    }
                    else {
                        response.json([{ 'error': 'oops something went wrong' }]);
                    }
                }
                else {
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'registered successfully' }]);
                }
            });
        })
        //run insert statement

    }

});

// curl -X PUT http://localhost:5000/users
// used to change password of logged in users
// input : id, current password, new password
app.post(ROUTE + "/change-password", function (request, response) {
    var id = request.body.id;
    var password = request.body.password;
    var new_password = request.body.new_password;
    console.log(id,password,new_password);
    if (id === undefined || password === undefined || new_password === undefined) {
        response.send([{ 'error': 'input is missing' }]);
    }
    else {
        //fetch password in database using id 
        var sql = "select password from users where id = ?";
        var values = [id];
        connection.con.query(sql, values, function (error, result) {
            if (error) {
                response.send([{ 'error': 'oops, something went wrong' }]);
                console.log(error);
            }
            else {
                if (result.length === 0) {
                    response.send([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid id' }]);
                }
                else {
                    var hashed_password = result[0]['password'];
                    //compare hashed_password and password
                    pwd.comparePassword(hashed_password, password).then((isMatched) => {
                        if (isMatched === false) {
                            response.send([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid password' }]);
                        }
                        else {
                            //generate hash value of new password 
                            pwd.hashPassword(new_password).then((NewHashedPassword) => {
                                var sql = "update users set password = ? where id = ?";
                                var values = [NewHashedPassword, id];
                                connection.con.query(sql, values, function (error, result) {
                                    if (error) {
                                        response.send([{ 'error': 'oops, something went wrong' }]);
                                        console.log(error);
                                    }
                                    else {
                                        response.send([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'password changed successfully' }]);
                                    }
                                })
                            })
                        }
                    })
                }
            }
        });
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