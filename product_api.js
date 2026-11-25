var connection = require("./connection.js");

// POST /product
// route to insert new product
// input : product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date (all input are required)
function insertProduct(request, response) {
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
        var sql = "insert into products (product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date) values(?,?,?,?,?,?,?,?,?,?,?)";
        var values = [product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date];
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
}

// PUT /product
// route to update product
// input : id (or product_code), product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date
function updateProduct(request, response) {
    var { id, product_code, name, description, category, brand, price, cost_price, stock, weight, is_active, manufacture_date } = request.body;
    if ((id === undefined && product_code === undefined) || name === undefined || description === undefined || category === undefined || brand === undefined || price === undefined || cost_price === undefined || stock === undefined || weight === undefined || is_active === undefined || manufacture_date === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        var checkSql = id !== undefined ? "select id from products where id = ?" : "select id from products where product_code = ?";
        var checkValues = [id !== undefined ? id : product_code];
        connection.con.query(checkSql, checkValues, function (error, result) {
            if (error !== null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else if (result.length == 0) {
                response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': id !== undefined ? 'id not found' : 'product_code not found' }]);
            }
            else {
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
}

// DELETE /product
// route to delete product
// input : id (required) or product_code
function deleteProduct(request, response) {
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
}

// GET /product
// route to fetch product
function getProduct(request, response) {
    var start = request.query.start;
    var sql = "select * from products order by id desc limit 0,10 ";
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
}

module.exports = {
    insertProduct: insertProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getProduct: getProduct,
    insert: insertProduct,
    update: updateProduct,
    delete: deleteProduct,
    get: getProduct
};
