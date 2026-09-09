function add(num1,num2)
{
    //create local variable 
    let result = num1 + num2;
    return result;
}
let sub = function(num1,num2) {
    //create local variable 
    let result = num1 - num2;
    return result;
}
// task develop function for multiplication, division 
//we must export functions 
module.exports.addition = add;
module.exports.subtraction = sub;