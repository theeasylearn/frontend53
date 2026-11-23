var mysql = require('mysql')
var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "",
    port : 3306,
    database : 'frontend53'
});
//establish connection
con.connect(function(error){
    if(error!=null)
    {
        console.log(error); 
    }    
    else 
    {
        console.log("connection established successfully");
    }
});

//export con object
module.exports.con = con; 