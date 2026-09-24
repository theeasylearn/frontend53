// example of how to delete file 
fs = require('fs');
filename = "country.txt";
fs.unlink(filename,function(error){
    if(error!=null)
    {
        console.log("file could not be deleted");
    }    
    else 
    {
        console.log("file has been deleted successfully");
    }
});