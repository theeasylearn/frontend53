// how to rename file (change file name )
fs = require('fs');
var oldFileName = "fruits.txt";
var newFileName = "vegitable.txt";
fs.rename(oldFileName,newFileName,function(error){
    if(error!=null)
    {
        console.log('file could not be renamed');
    }
    else 
    {
        console.log("file has been renamed successfully");
    }
});

