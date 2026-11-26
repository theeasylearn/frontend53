var connection = require("./connection.js");
var sql = "select * from contact order by id desc";
// select 
connection.con.query(sql,function(error,result,fields){
    if(error!=null)
        console.log(error);
    else 
    {
        // result is list of object which has data fetched from table 
        // console.log(result);
        for(var index = 0;index<result.length;index++)
        {
            console.log(result[index]['id'],result[index]['name'],result[index]['mobile'],result[index]['email'],result[index]['mobile']);
        }
    }
    connection.con.end();
});