// import local module
const Interest = require('./interest');

var i1 = new Interest(125000000,10,3);
var result = i1.getInterest();
console.log("Simple Interest ",result);