var connection = require("./connection.js");

// POST /category
// route to insert new category
// input : title, photo (all input are required)
function insertCategory(request, response) {
    var title = request.body.title;
    var photo = request.body.photo;
    if (title === undefined || photo === undefined) {
        response.json([{ 'error': 'input missing' }]);
    }
    else {
        var sql = "insert into category (title,photo) values(?,?)";
        var values = [title, photo];
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
}

// PUT /category
// route to update category
// input : title, photo, id (all input are required)
function updateCategory(request, response) {
    var { id, title, photo } = request.body;
    if (id === undefined || title === undefined || photo === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    }
    else {
        var sql = "select id from category where id = ?";
        var values = [id];
        connection.con.query(sql, values, function (error, result) {
            if (error !== null) {
                response.json([{ 'error': 'oops something went wrong' }]);
                console.log(error);
            }
            else if (result.length == 0) {
                response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'id not found' }]);
            }
            else {
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
}

// DELETE /category
// route to delete category
// input : id (required)
function deleteCategory(request, response) {
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
            else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'category deleted' }]);
            }
        });
    }
}

// GET /category
// route to fetch category
function getCategory(request, response) {
    var start = request.query.start;
    var sql = "select * from category order by id desc limit 0,10 ";
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
}

module.exports = {
    insertCategory: insertCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    getCategory: getCategory,
    insert: insertCategory,
    update: updateCategory,
    delete: deleteCategory,
    get: getCategory
};
