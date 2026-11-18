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
app.post(ROUTE, function (request, response) {
    response.send("insert new category");
});

// route to update category
app.put(ROUTE, function (request, response) {
    response.send("update existing category");
});

// route to delete category
app.delete(ROUTE, function (request, response) {
    response.send("delete existing category");
});


// route to fetch category
app.get(ROUTE, function (request, response) {
    //create sql variable 
    var start = request.query.start;
    var sql = "select * from category order by id desc limit 0,10 "; //fetch 10 rows 
    var data = [];
    if(start !== undefined)
    {
        sql = "select * from category order by id desc limit ?,10 ";
        data = [parseInt(start)];
    }
    connection.con.query(sql,data, function (error, result, fields) {
        if (error != null) {
            response.json([{ 'error': 'oops something went wrong' }]);
            console.log(error);
        }
        else {
            response.json(result);
        }
    });
});

const port = 5000;
app.listen(port);
console.log("ready to accept request");

