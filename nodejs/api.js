var express = require('express');
var bodyParser = require('body-parser');

// Import table-specific API handlers
var usersApi = require('./users_api.js');
var categoryApi = require('./category_api.js');
var productApi = require('./product_api.js');

var app = express();

// Middleware to accept input submitted with post/put/delete method
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes from 14_api.js (Users table)
app.post("/users/login", usersApi.login);
app.post("/users", usersApi.register);
app.post("/users/change-password", usersApi.changePassword);
app.post("/users/forgot-password", usersApi.forgotPassword);

// Routes from 15_api.js (Category table)
app.post("/category", categoryApi.insertCategory);
app.put("/category", categoryApi.updateCategory);
app.delete("/category", categoryApi.deleteCategory);
app.get("/category", categoryApi.getCategory);

// Routes from 16_api.js (Products table)
app.post("/product", productApi.insertProduct);
app.put("/product", productApi.updateProduct);
app.delete("/product", productApi.deleteProduct);
app.get("/product", productApi.getProduct);

const port = 5000;
app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("ready to accept request...");
    }
});

module.exports = app;
