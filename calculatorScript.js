const calcDisplayContainer = document.querySelector("#calcDisplayContainer");
const calcNumbers = document.querySelectorAll(".calcButtonNumber");
const calcOperators = document.querySelectorAll(".calcButtonOperator");
const calcClearButton = document.querySelector("#calcButtonClear");
const calcEqualsButton = document.querySelector("#equalsButton");
const calcAddButton = document.querySelector("#addButton");
const calcSubButton = document.querySelector("#subtractButton");
const calcMultiplyButton = document.querySelector("#multiplyButton");
const calcDivideButton = document.querySelector("#divideButton");

//Creates the display
const createDisplay = () => {
    const calcDisplay = document.createElement("div");
    calcDisplay.id = "calcDisplay";
    calcDisplayContainer.appendChild(calcDisplay);
};

createDisplay();

//Mathematical operator functions
function add(a, b) {
    return Math.round((parseInt(a) + parseInt(b)) * 100) / 100;
}

function subtract(a, b) {
    return Math.round((parseInt(a) - parseInt(b)) * 100) / 100;
}

function multiply(a, b) {
    return Math.round(parseInt(a) * parseInt(b) * 100) / 100;
}

function divide(a, b) {
    if (b == 0) {
        return "Error";
    } else {
        return Math.round((parseInt(a) / parseInt(b)) * 100) / 100;
    }
}

//Takes an operator and 2 numbers, calls one of the above functions
function operate(operator, a, b) {
    switch (operator) {
        case add:
            return add(a, b);
            break;

        case subtract:
            return subtract(a, b);
            break;

        case multiply:
            return multiply(a, b);
            break;

        case divide:
            return divide(a, b);
            break;
    }
}

//Captures the button clicks for use in the operations
let inputNumOne = [];
let inputNumTwo = [];

//Makes the number and operator buttons display on the screen and add to the sum
calcNumbers.forEach((calcNumber) => {
    calcNumber.addEventListener("click", (e) => {
        let numberDiv = document.createElement("div");
        numberDiv.append(calcNumber.value);
        calcDisplay.appendChild(numberDiv);
        if (inputNumTwo.length == 0) {
            inputNumOne.push(parseInt(calcNumber.value));
        } else if (inputNumTwo.length > 0) {
            inputNumTwo.push(parseInt(calcNumber.value));
        }
    });
});

calcOperators.forEach((calcOperator) => {
    calcOperator.addEventListener("click", (e) => {
        if (
            Array.from(calcDisplayContainer.textContent)[0] == "" ||
            Array.from(calcDisplayContainer.textContent)[0] == undefined ||
            Array.from(calcDisplayContainer.textContent)[0] == "N"
        ) {
            return;
        } else {
            let operatorDiv = document.createElement("div");
            operatorDiv.append(calcOperator.textContent);
            calcDisplay.appendChild(operatorDiv);
        }
    });
});

//Clear button functionality
calcButtonClear.addEventListener("click", (e) => {
    inputNumOne = [];
    inputNumTwo = [];
    rollingSum = [];
    calcDisplay.remove();
    createDisplay();
});

//Arrays for operators
let rollingSum = [];

//Operator button functionality. Every button has to function has an equals button too!!!
//Addition
let addition = calcAddButton.addEventListener("click", (e) => {
    if (
        Array.from(calcDisplayContainer.textContent)[0] == "" ||
        Array.from(calcDisplayContainer.textContent)[0] == undefined ||
        Array.from(calcDisplayContainer.textContent)[0] == "N"
    ) {
        return;
    }
    //multiplication equals functionality
    if (Array.from(calcDisplayContainer.textContent).includes("*")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(multiply, numsToAddOne, parseInt(rollingSum))
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(multiply, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //division equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("÷")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(divide, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(divide, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //subtraction equals functionality
    else if (
        Array.from(calcDisplayContainer.textContent).includes("-") &&
        Array.from(calcDisplayContainer.textContent).indexOf("-") !== 0
    ) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(subtract, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(subtract, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "+");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //addition functionality
    else if (inputNumTwo.length == 0 && rollingSum.length == 0) {
        let answerDiv = document.createElement("div");
        calcDisplay.appendChild(answerDiv);
        inputNumTwo.push(parseInt(0));
    } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        rollingSum.push(operate(add, numsToAddOne, parseInt(rollingSum)));
        rollingSum.shift();
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "+");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    } else if (inputNumTwo.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        let numsToAddTwo = parseInt([...inputNumTwo].join(""));
        rollingSum.push(operate(add, numsToAddOne, numsToAddTwo));
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "+");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    }
});

let subtraction = calcSubButton.addEventListener("click", (e) => {
    if (
        Array.from(calcDisplayContainer.textContent)[0] == "" ||
        Array.from(calcDisplayContainer.textContent)[0] == undefined ||
        Array.from(calcDisplayContainer.textContent)[0] == "N"
    ) {
        return;
    }
    //addition equals functionality
    if (Array.from(calcDisplayContainer.textContent).includes("+")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(operate(add, numsToAddOne, parseInt(rollingSum)));
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(add, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //multiplication equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("*")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(multiply, numsToAddOne, parseInt(rollingSum))
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(multiply, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //division equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("÷")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(divide, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(divide, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "-");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //subtraction functionality
    else if (inputNumTwo.length == 0 && rollingSum.length == 0) {
        let answerDiv = document.createElement("div");
        calcDisplay.appendChild(answerDiv);
        inputNumTwo.push(parseInt(0));
    } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        rollingSum.push(operate(subtract, parseInt(rollingSum), numsToAddOne));
        rollingSum.shift();
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "-");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    } else if (inputNumTwo.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        let numsToAddTwo = parseInt([...inputNumTwo].join(""));
        rollingSum.push(operate(subtract, numsToAddOne, numsToAddTwo));
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "-");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    }
});

let multiplication = calcMultiplyButton.addEventListener("click", (e) => {
    if (
        Array.from(calcDisplayContainer.textContent)[0] == "" ||
        Array.from(calcDisplayContainer.textContent)[0] == undefined ||
        Array.from(calcDisplayContainer.textContent)[0] == "N"
    ) {
        return;
    }
    //addition equals functionality
    if (Array.from(calcDisplayContainer.textContent).includes("+")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(operate(add, numsToAddOne, parseInt(rollingSum)));
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(add, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //subtraction equals functionality
    else if (
        Array.from(calcDisplayContainer.textContent).includes("-") &&
        Array.from(calcDisplayContainer.textContent).indexOf("-") !== 0
    ) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(subtract, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(subtract, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //division equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("÷")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(divide, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(divide, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "*");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //multiplication functionality
    else if (inputNumTwo.length == 0 && rollingSum.length == 0) {
        let answerDiv = document.createElement("div");
        calcDisplay.appendChild(answerDiv);
        inputNumTwo.push(parseInt(0));
    } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        rollingSum.push(operate(multiply, numsToAddOne, parseInt(rollingSum)));
        rollingSum.shift();
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "*");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    } else if (inputNumTwo.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        let numsToAddTwo = parseInt([...inputNumTwo].join(""));
        rollingSum.push(operate(multiply, numsToAddOne, numsToAddTwo));
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "*");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    }
});

let division = calcDivideButton.addEventListener("click", (e) => {
    if (
        Array.from(calcDisplayContainer.textContent)[0] == "" ||
        Array.from(calcDisplayContainer.textContent)[0] == undefined ||
        Array.from(calcDisplayContainer.textContent)[0] == "N"
    ) {
        return;
    }
    //addition equals functionality
    if (Array.from(calcDisplayContainer.textContent).includes("+")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));

            rollingSum.push(operate(add, numsToAddOne, parseInt(rollingSum)));
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(add, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //multiplication equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("*")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(multiply, numsToAddOne, parseInt(rollingSum))
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(multiply, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //subtraction equals functionality
    else if (
        Array.from(calcDisplayContainer.textContent).includes("-") &&
        Array.from(calcDisplayContainer.textContent).indexOf("-") !== 0
    ) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(subtract, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(subtract, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString + "÷");
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //division functionality
    else if (inputNumTwo.length == 0 && rollingSum.length == 0) {
        let answerDiv = document.createElement("div");
        calcDisplay.appendChild(answerDiv);
        inputNumTwo.push(parseInt(0));
    } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        rollingSum.push(operate(divide, parseInt(rollingSum), numsToAddOne));
        rollingSum.shift();
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "÷");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    } else if (inputNumTwo.length > 0) {
        let numsToAddOne = parseInt([...inputNumOne].join(""));
        let numsToAddTwo = parseInt([...inputNumTwo].join(""));
        rollingSum.push(operate(divide, numsToAddOne, numsToAddTwo));
        calcDisplay.remove();
        createDisplay();
        let rollingSumString = rollingSum.toString();
        let answerDiv = document.createElement("div");
        answerDiv.append(rollingSumString + "÷");
        calcDisplay.appendChild(answerDiv);
        inputNumOne = [];
        inputNumTwo = [];
    }
});
//Equals button functionality
let equals = calcEqualsButton.addEventListener("click", (e) => {
    //addition equals functionality
    if (Array.from(calcDisplayContainer.textContent).includes("+")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(operate(add, numsToAddOne, parseInt(rollingSum)));
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(add, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
    //subtraction equals functionality
    else if (
        Array.from(calcDisplayContainer.textContent).includes("-") &&
        Array.from(calcDisplayContainer.textContent).indexOf("-") !== 0
    ) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(subtract, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(subtract, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //division equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("÷")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            calcDisplay.appendChild(answerDiv);
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(divide, parseInt(rollingSum), numsToAddOne)
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(divide, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }

    //multiplication equals functionality
    else if (Array.from(calcDisplayContainer.textContent).includes("*")) {
        if (inputNumTwo.length == 0 && rollingSum.length == 0) {
            let answerDiv = document.createElement("div");
            inputNumTwo.push(parseInt(0));
        } else if (rollingSum.length > 0 && inputNumOne.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            rollingSum.push(
                operate(multiply, numsToAddOne, parseInt(rollingSum))
            );
            rollingSum.shift();
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        } else if (inputNumTwo.length > 0) {
            let numsToAddOne = parseInt([...inputNumOne].join(""));
            let numsToAddTwo = parseInt([...inputNumTwo].join(""));
            rollingSum.push(operate(multiply, numsToAddOne, numsToAddTwo));
            calcDisplay.remove();
            createDisplay();
            let rollingSumString = rollingSum.toString();
            let answerDiv = document.createElement("div");
            answerDiv.append(rollingSumString);
            calcDisplay.appendChild(answerDiv);
            inputNumOne = [];
            inputNumTwo = [];
        }
    }
});
