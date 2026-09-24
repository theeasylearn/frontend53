// import local module
const maths = require("./local_modules");
const c = require('./currency');
var num1 = 10;
var num2 = 20;

var result = maths.addition(num1,num2);
console.log("addition ",result);

var result2 = maths.subtraction(num1,num2);
console.log("subtraction ",result2);

var rupees = 10000;
var dollar = c.toDollar(rupees);
console.log("dollar",dollar);

var euro = c.toEuro(rupees);
console.log("euro ",euro);

var pound = c.toPound(rupees);
console.log("pound ",pound);



