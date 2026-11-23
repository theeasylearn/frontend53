// simple example of CRUD operation
// C = Create (insert row into table)
// R = Read (select data from table)
// U = Update (update row in table)
// D = Delete (delete row from table)
var express = require('express')
var bodyParser = require('body-parser');
var connection = require("./connection.js");
var app = express();
//below lines are required to accept input submitted with post/put/delete method
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const ROUTE = "/category";
// route to insert new category
// input : title, photo (all input are required)
app.post(ROUTE, function (request, response) {
    //create 2 variable to store input passed in api 
    var title = request.body.title;
    var photo = request.body.photo;
    if (title === undefined || photo === undefined) {
        response.json([{ 'error': 'input missing' }]);
    }
    else {
        //both input is passed in api 
        //create sql variable to store insert sql statement 
        var sql = "insert into category (title,photo) values(?,?)"; //? = placeholder 
        var values = [title, photo]; //list (array)
        //execute sql statement
        connection.con.query(sql, values, function (error) {
            if (error != null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'category added' }]);
            }
        });
    }
});

// route to update category
// input : title, photo, id (all input are required)
app.put(ROUTE, function (request, response) {
    //create variable to store inputs (Object Destructing)
    var { id, title, photo } = request.body;
    //check all inputs are available or not 
    if (id === undefined || title === undefined || photo === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        //check id is found in category table or not 
        var sql = "select id from category where id = ?";
        var values = [id];
        //run sql statement 
        connection.con.query(sql, values, function (error, result) {
            if (error !== null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else if (result.length == 0) {
                response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'id not found' }]);
            }
            else {
                //create sql variable to update row 
                var sql = "update category set title=?,photo=? where id=?";
                var values = [title, photo, id];
                connection.con.query(sql, values, function (error) {
                    if (error !== null) {
                        response.json([{ 'error': 'oops something went wrong' }]);
                        console.log(error);
                    }
                    else {
                        response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'category updated' }]);
                    }
                });
            }
        });
    }
});

// route to delete category
//input : id (required)
app.delete(ROUTE, function (request, response) {
    var id = request.body.id;
    if (id === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        var sql = "delete from category where id = ?";
        var values = [id];
        connection.con.query(sql, values, function (error) {
            if (error != null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else 
            {
                 response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'category deleted' }]);
            }
        });
    }
});
// route to fetch category
app.get(ROUTE, function (request, response) {
    //create sql variable 
    var start = request.query.start;
    var sql = "select * from category order by id desc limit 0,10 "; //fetch 10 rows 
    var data = [];
    if (start !== undefined) {
        sql = "select * from category order by id desc limit ?,10 ";
        data = [parseInt(start)];
    }
    connection.con.query(sql, data, function (error, result, fields) {
        if (error != null) {
            response.json([{ 'error': 'oops something went wrong' }]);
            console.log(error);
        }
        else {
            result.unshift({ 'total': result.length });
            result.unshift({ 'error': 'no' });
            response.json(result);
        }
    });
});

const port = 5000;
app.listen(port);
console.log("ready to accept request");

