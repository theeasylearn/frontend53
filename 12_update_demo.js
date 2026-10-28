var connection = require("./connection.js");
var sql = "update contact set name='Radha sharma',email='radha@gmail.com',mobile='1234567890' where id=6";
//insert, update, delete, select 
connection.con.query(sql,function(error,result){
    if(error!=null)
        console.log(error);
    else 
        if(result.affectedRows >= 1)
            console.log("contact has been updated successfully ",result.affectedRows);
        else 
            console.log("Contact not found");
    connection.con.end();
});