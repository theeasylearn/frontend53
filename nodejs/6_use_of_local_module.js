// import local module
const info = require("./info");
const db = require("./database_info");
console.log(info.sitename);
console.log(info.address);
console.log(info.pincode);
console.log(db.name + " " + db.username + " " + db.password + " " + db.portno);
