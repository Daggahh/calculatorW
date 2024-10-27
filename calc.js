function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
return b === 0 ? "Error" : a / b;
}

function multiplyByTwo() {
  let multipliedValue = parseFloat(display.value) * 2;
  if (multipliedValue.toString().length > 9) {
        multipliedValue = multipliedValue.toExponential(4);
    }else {
        multipliedValue = parseFloat(multipliedValue.toPrecision(9));
    }

      document.getElementById("display").value = multipliedValue;
}

function operator(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return minus(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.getElementById("display");

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay();
}

function backSpace() {
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function appendToDisplay(value) {
    if (displayValue.length < 9){
  if (displayValue === "0" && value !== ".") {
    displayValue = value.toString();
  } else if (value === "." && displayValue.includes(".")) {
    return;
  } else {
    displayValue += value.toString();
  }
  updateDisplay();
}
}

function updateDisplay() {
  display.value = displayValue;
}

function calculate() {
  if (currentOperator && firstOperand !== null) {
    secondOperand = parseFloat(displayValue);
    let result = operator(currentOperator, firstOperand, secondOperand);

    if (typeof result === "string") {
      displayValue = result;
    } else {
      displayValue = roundResult(result).toString();
      firstOperand = result;
    }
    currentOperator = null;
    updateDisplay();
  } else {
    firstOperand = parseFloat(displayValue);
  }
}

function roundResult(num) {
    let numString = num.toString();
    if (numString.length > 9) {
        return num.toExponential(4);
    }

    return parseFloat(num.toPrecision(9));
}

function handleOperator(operator) {
  if (currentOperator && secondOperand !== null) {
    calculate();
  }
  currentOperator = operator;
  firstOperand = parseFloat(displayValue);
  displayValue = "0";
    updateDisplay();
}

document.addEventListener("keydown", (event) => {
  if (event.key >= 0 && event.key <= 9) {
    appendToDisplay(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Backspace") {
    backSpace();
  } else if (event.key === "Escape") {
    clearDisplay();
  }
});
