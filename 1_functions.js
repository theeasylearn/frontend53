//define function 
// 1st technique to create/define 
function printCurrentDate()
{
    //create date class object
    let today = new Date();
    let temp = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    console.log(temp);
}
//2nd technique to create function
let printCurrentTime = function() {
    let now = new Date();
    let temp = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    console.log(temp);
}
//3rd technique to create function 
let printDateTime = () => {
    printCurrentDate();
    printCurrentTime();
}

printDateTime();