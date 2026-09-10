// import local module
const mailer = require("./mailer");

//create object using template 
const m1 = new mailer("ram@gmail.com","hello Mr.ram","How are you.");
m1.sendMail();
