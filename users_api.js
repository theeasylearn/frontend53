var connection = require("./connection.js");
var pwd = require("./password.js");

// POST /users/login
// check email and password is found in table or not
// require input : email and password
function login(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email === undefined || password === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        var sql = "select id, password from users where email = ?";
        var values = [email];
        connection.con.query(sql, values, function (error, result) {
            if (error != null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else {
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
                    });
                }
            }
        });
    }
}

// POST /users
// register new user
// require input : email, mobile, password
function register(request, response) {
    var email = request.body.email;
    var mobile = request.body.mobile;
    var password = request.body.password;
    if (email === undefined || mobile === undefined || password === undefined) {
        response.json([{ 'error': 'input missing' }]);
    }
    else {
        // password hash
        pwd.hashPassword(password).then((NewHashedPassword) => {
            var sql = "insert into users (email,mobile,password) values (?,?,?)";
            var values = [email, mobile, NewHashedPassword];
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
        });
    }
}

// POST /users/change-password
// used to change password of logged in users
// input : id, current password, new password
function changePassword(request, response) {
    var id = request.body.id;
    var password = request.body.password;
    var new_password = request.body.new_password;
    console.log(id, password, new_password);
    if (id === undefined || password === undefined || new_password === undefined) {
        response.send([{ 'error': 'input is missing' }]);
    }
    else {
        // fetch password in database using id 
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
                    pwd.comparePassword(hashed_password, password).then((isMatched) => {
                        if (isMatched === false) {
                            response.send([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid password' }]);
                        }
                        else {
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
                                });
                            });
                        }
                    });
                }
            }
        });
    }
}

// POST /users/forgot-password
// required input : email
function forgotPassword(request, response) {
    var email = request.body.email;
    if (email === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        // check email exists in table or not 
        var sql = "select id from users where email = ?";
        var values = [email];
        connection.con.query(sql, values, function (error, result) {
            if (error) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else {
                if (result.length == 0) {
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'email not registered with us' }]);
                }
                else {
                    let newPassword = pwd.generatePassword();
                    console.log(newPassword);
                    pwd.hashPassword(newPassword).then((hashed_password) => {
                        console.log(hashed_password);
                        var sql = "update users set password=? where email=?";
                        var values = [hashed_password, email];
                        connection.con.query(sql, values, function (error, result) {
                            if (error) {
                                response.json([{ 'error': 'oops something went wrong' }]);
                                console.log(error);
                            }
                            else {
                                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'we have recovered your account, check email' }]);
                                var e = require("./MyEmail.js");
                                var mail = new e.EMail();
                                var subject = "password recovery email from frontend 53 (demo)";
                                var message = "your new password is " + newPassword;
                                mail.send(email, subject, message);
                            }
                        });
                    });
                }
            }
        });
    }
}

module.exports = {
    login: login,
    register: register,
    changePassword: changePassword,
    forgotPassword: forgotPassword
};
