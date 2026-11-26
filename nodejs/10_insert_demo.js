var connection = require("./connection.js");
var sql = "insert into contact (name,mobile,email,message) values ('Ram kumar','9876543210','ram@gmail.com','i want to buy your product')";
connection.con.query(sql,function(error,result){
    if(error)
        console.log(error);
    else 
        console.log("contact has been added successfully " + result.insertId);

    connection.con.end();
});

