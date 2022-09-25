const add = function(a,b){
    return a+b
}
const subtract = function(a,b){
    return a-b
}
const multiply = function(a,b){
    return a*b
}
const divide = function(a,b){
    return  a/b
    }
const operate = function(operator, a, b){
    a = parseFloat(a)
    b = parseFloat(b)
    switch(operator){
        case "+" :
            return add(a,b);
        case "-" : 
            return subtract(a,b);
        case "*" : 
            return multiply(a,b);
        case "/" : 
            if (b==="0"){
                return null
            } else return divide(a,b)
        default : 
            return alert("Invalid operator")
    }
}
// Get DOM elements
const mainDisplay = document.querySelector(".main")
const secondDisplay = document.querySelector(".second")
const operands = document.querySelectorAll(".operand")
const operators = document.querySelectorAll(".operator")
const result = document.querySelector(".result")
const clearButton = document.querySelector(".clearButton")
const decimal = document.querySelector('.decimal')
const undo = document.querySelector(".undoButton")

// Initial state
let prevOp = currentOp = ""
let operationResult = 0
let isClicked = false
let numbers = []
let temp = ""
mainDisplay.textContent = "0"

// Events
operands.forEach(operand => operand.addEventListener("click", () => setNumber(operand.value)))
decimal.addEventListener("click", () => putDecimal())
clearButton.addEventListener("click", () => clearDisplay())
operators.forEach(operator => operator.addEventListener("click", () => doOperation(operator.value)))

result.addEventListener("click", () => getResult())

undo.addEventListener("click", () => undoInput())

// Remets toutes les variables à 0
function clearDisplay(){
    prevOp = currentOp = temp = ""
    operationResult = 0
    numbers = []
    isClicked = false
    mainDisplay.textContent = "0"
    secondDisplay.textContent = ""
}

// Prends un chiffre et l'ajoute a une variable de stockage
function setNumber(number){
    if (mainDisplay.textContent==="0"){
        mainDisplay.textContent = ""
    }
    temp += number
    mainDisplay.textContent = temp
}

// Ajoute le "."
function putDecimal(){
    if (!isClicked) {
        temp += "."
        mainDisplay.textContent = temp
        isClicked = true
    }
}

// Renvoie l'operateur
function setOperator(clickedOp){
    if (!currentOp){
        currentOp = clickedOp
    } else {
        prevOp = currentOp
        currentOp = clickedOp
    }
    isClicked = false
    return currentOp

}


// effectue l'operation
// Si 2 operandes et currentOp => operate => MAJ affichage => stockage resultat
// Sinon return
function evaluate(ope){
    if (!ope){
        return
    } else if (ope == "/" && numbers[1]=="0"){
        alert("No division by 0")
        clearDisplay()
        return
    } else if (numbers.length==2){
        operationResult = operate(ope, numbers[0], numbers[1])
        operationResult = Math.round((operationResult + Number.EPSILON) * 100000) / 100000
        numbers.splice(0, 2, operationResult)
        mainDisplay.textContent = operationResult 
        return numbers
    }
}

function getResult(){
    if (temp!="" && (currentOp || prevOp)){
        numbers.push(temp)
    }
    if (numbers.length == 2){
        if (currentOp && numbers[1]){
            secondDisplay.textContent = `${numbers[0]} ${currentOp} ${numbers[1]} =`
            evaluate(currentOp)
        }
    }
    prevOp = currentOp = temp = ""
}

function undoInput(){
    temp = temp.slice(0, -1)
    mainDisplay.textContent = temp
}

function doOperation(ope){
    if (temp!=""){
        numbers.push(temp)
    }
    setOperator(ope)
    temp=""
    evaluate(prevOp)
    secondDisplay.textContent = numbers[0] + " " + currentOp
}

window.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9) setNumber(e.key)
    if (e.key === ".") putDecimal()
    if (e.key === "=" || e.key === "Enter") getResult()
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") doOperation(e.key)
    if (e.key === "Backspace") undoInput()
    console.log(e.key)
})
