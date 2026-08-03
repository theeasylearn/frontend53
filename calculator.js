
//create user defined function
function calculateResult() {
    //alert("form submitted");
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    //convert input into integer
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    //get selected radio button value 
    var choice = document.querySelector("input[name='operation']:checked").value;
    //check input are stored in variable or not 
    console.log(num1, num2, choice);
    var result = null; //null means nothing
    if (choice === "1") {
        //addition
        result = num1 + num2;
    }
    else if (choice === "2") {
        //subtraction
        result = num1 - num2;
    }
    else if (choice === "3") {
        //multiplication
        result = num1 * num2;
    }
    else if (choice === "4") {
        //division
        result = num1 / num2;
    }
    document.getElementById('output').innerHTML = "result is " + result
    document.getElementById('output').style = "color:blue;font-weight:bold;padding:10px;"
    //below must be last line
    return false; //required otherwise web page will be refreshed and all input will be cleared. 
} 