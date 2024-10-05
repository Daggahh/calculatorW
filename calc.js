const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function deleteDisplay(){
let newValue = display.value.slice(0, -1);
document.getElementById("display").value = newValue;
}

function multiplyByTwo(){
    let multipliedValue = display.value * 2;
    document.getElementById("display").value = multipliedValue;
    // display.value = (display.value)*2;
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "Error"
    }
}