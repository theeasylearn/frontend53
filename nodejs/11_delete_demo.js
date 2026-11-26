var connection = require("./connection.js");
var sql = "delete from contact where id=5";
//insert, update, delete, select 
connection.con.query(sql,function(error,result){
    if(error!=null)
        console.log(error);
    else 
        if(result.affectedRows >= 1)
            console.log("contact has been deleted successfully ",result.affectedRows);
        else 
            console.log("Contact not found");
    connection.con.end();
});