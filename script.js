let operand1 = "";
let operand2 = "";
let firstOperand = true;
let operandHasDecimal = false;

let operator = "";
let firstOperator = true;
let operators = new Set(["+", "-", "*", "/"]);

let wasEqualPressed = false;
let divisionByZero = false;

const decimalBtn = document.querySelector(".decimal-btn");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

function operate(operand1, operator, operand2) {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    let result;

    if (operator === "+") {
        result = add(operand1, operand2);
    }

    else if (operator === "-") {
        result = subtract(operand1, operand2);
    }

    else if (operator === "*") {
        result = multiply(operand1, operand2);
    }

    else if (operator === "/") {
        if (operand2 === 0) {
            divisionByZero = true;
            return;
        }

        else {
             result = divide(operand1, operand2);
        }
    }

    return (Math.round(result * 100) / 100).toString();
}

function reset() {
    operand1 = "";
    operand2 = "";
    operator = "";

    firstOperand = true;
    firstOperator = true;

    wasEqualPressed = false;
    operandHasDecimal = false;
}

function start_new_operand() {
    operand2 = "";
    firstOperand = false;
    
    operandHasDecimal = false;
    decimalBtn.disabled = false;
}

function operate_and_display() {
    let result = operate(operand1, operator, operand2);

    if (divisionByZero) {
        reset();
        displayElem.value = "DIVISION BY ZERO";
        return;
    }

    operand1 = result;
    start_new_operand();    
    
    displayElem.value = result;
}

function clearPressed() {
    reset();
    divisionByZero = false;
    displayElem.value = "";
}

function equalPressed() {
    if (operand1 === "" || operator === "" || operand2 === "") {
        return;
    }

    operate_and_display();

    operator = "";
    firstOperator = true;
    wasEqualPressed = true;
}

function operatorPressed(operatorBtn) {
    if (operand1 === "" || (operand2 === "" && operator != "") ) {
        return;
    }

    wasEqualPressed = false;
    
    if (firstOperator) {
        start_new_operand();
    }

    else {
        operate_and_display();
    }

    operator = operatorBtn;
    firstOperator = false;

    displayElem.value += operatorBtn;
}

function operandPressed(operandBtn) {

    if (wasEqualPressed) {
        clearPressed();
    }

    if (firstOperand) {
        if (operandBtn === ".") decimalPressed();
        operand1 += operandBtn;
    }

    else {
        if (operandBtn === ".") decimalPressed();
        operand2 += operandBtn;
    }

    displayElem.value += operandBtn;
}

function decimalPressed() {
    if (operandHasDecimal) {
        return;
    }

    decimalBtn.disabled = true;
    operandHasDecimal = true;
}

function backspacePressed() {
    if (firstOperand) {
        operand1 = operand1.slice(0, -1);
        displayElem.value = operand1;
    }

    else {
        operand2 = operand2.slice(0, -1);
        displayElem.value = `${operand1}${operator}${operand2}`;
    }
}

const displayElem = document.querySelector("input");

function handleInput(btnElem) {
    const btnVal = btnElem.textContent;

    if (btnVal === "Clear") {
        clearPressed();
    }

    else if (divisionByZero) {
        return;
    }

    else if (btnVal === "=") {
        equalPressed();
    }

    else if (operators.has(btnVal)) {
        operatorPressed(btnVal);
    }

    else if (btnVal === "Backspace") {
        backspacePressed();
    }

    else {
        operandPressed(btnVal);
    }
}

const btnElems = document.querySelectorAll("button");
btnElems.forEach( (btnElem) => {
    btnElem.addEventListener("click", () => handleInput(btnElem) );
} );

