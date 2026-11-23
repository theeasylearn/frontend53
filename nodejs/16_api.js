// simple example of CRUD operation
// C = Create (insert row into table)
// R = Read (select data from table)
// U = Update (update row in table)
// D = Delete (delete row from table)
var express = require('express');
var bodyParser = require('body-parser');
var connection = require("./connection.js");
var app = express();

//below lines are required to accept input submitted with post/put/delete method
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware to support both /product and /products routes
app.use(function (request, response, next) {
    if (request.url.startsWith("/products")) {
        request.url = request.url.replace(/^\/products/, "/product");
    }
    next();
});

const ROUTE = "/product";

// route to insert new product
// input : product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date (all input are required)
app.post(ROUTE, function (request, response) {
    //create variables to store input passed in api 
    var product_code = request.body.product_code;
    var name = request.body.name;
    var description = request.body.description;
    var category = request.body.category;
    var brand = request.body.brand;
    var price = request.body.price;
    var cost_price = request.body.cost_price;
    var stock = request.body.stock;
    var weight = request.body.weight;
    var is_active = request.body.is_active;
    var manufacture_date = request.body.manufacture_date;

    if (product_code === undefined || name === undefined || description === undefined || category === undefined || brand === undefined || price === undefined || cost_price === undefined || stock === undefined || weight === undefined || is_active === undefined || manufacture_date === undefined) {
        response.json([{ 'error': 'input missing' }]);
    }
    else {
        //all input is passed in api 
        //create sql variable to store insert sql statement 
        var sql = "insert into products (product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date) values(?,?,?,?,?,?,?,?,?,?,?)"; //? = placeholder 
        var values = [product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date]; //list (array)
        //execute sql statement
        connection.con.query(sql, values, function (error) {
            if (error != null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'product added' }]);
            }
        });
    }
});

// route to update product
// input : id (or product_code), product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date
app.put(ROUTE, function (request, response) {
    //create variable to store inputs (Object Destructuring)
    var { id, product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date } = request.body;
    //check all inputs are available or not 
    if ((id === undefined && product_code === undefined) || name === undefined || description === undefined || category === undefined || brand === undefined || price === undefined || cost_price === undefined || stock === undefined || weight === undefined || is_active === undefined || manufacture_date === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        //check product is found in products table or not 
        var checkSql = id !== undefined ? "select id from products where id = ?" : "select id from products where product_code = ?";
        var checkValues = [id !== undefined ? id : product_code];
        //run sql statement 
        connection.con.query(checkSql, checkValues, function (error, result) {
            if (error !== null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else if (result.length == 0) {
                response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': id !== undefined ? 'id not found' : 'product_code not found' }]);
            }
            else {
                //create sql variable to update row 
                var sql = id !== undefined
                    ? "update products set product_code=?,name=?,description=?,category=?,brand=?,price=?,cost_price=?,stock=?,weight=?,is_active=?,manufacture_date=? where id=?"
                    : "update products set name=?,description=?,category=?,brand=?,price=?,cost_price=?,stock=?,weight=?,is_active=?,manufacture_date=? where product_code=?";
                var values = id !== undefined
                    ? [product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date, id]
                    : [name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date, product_code];
                connection.con.query(sql, values, function (error) {
                    if (error !== null) {
                        response.json([{ 'error': 'oops something went wrong' }]);
                        console.log(error);
                    }
                    else {
                        response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'product updated' }]);
                    }
                });
            }
        });
    }
});

// route to delete product
// input : id (required) or product_code
app.delete(ROUTE, function (request, response) {
    var id = request.body.id;
    var product_code = request.body.product_code;
    if (id === undefined && product_code === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        var sql = id !== undefined ? "delete from products where id = ?" : "delete from products where product_code = ?";
        var values = [id !== undefined ? id : product_code];
        connection.con.query(sql, values, function (error) {
            if (error != null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'product deleted' }]);
            }
        });
    }
});

// route to fetch product
app.get(ROUTE, function (request, response) {
    //create sql variable 
    var start = request.query.start;
    var sql = "select * from products order by id desc limit 0,10 "; //fetch 10 rows 
    var data = [];
    if (start !== undefined) {
        sql = "select * from products order by id desc limit ?,10 ";
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
