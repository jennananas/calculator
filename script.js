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
operators.forEach(operator => operator.addEventListener("click", () => {
    if (temp!=""){
        numbers.push(temp)
    }
    setOperator(operator.value)
    temp=""
    evaluate(prevOp)
    secondDisplay.textContent = numbers[0] + " " + currentOp
}))

result.addEventListener("click", () => {
    if (temp!="" && (currentOp || prevOp)){
        numbers.push(temp)
    }
    if (numbers.length != 2){
        return
    } else {
        if (currentOp && numbers[1]){
            secondDisplay.textContent = `${numbers[0]} ${currentOp} ${numbers[1]} =`
            evaluate(currentOp)
        }
    }
    prevOp = currentOp = temp = ""
})

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
        numbers.splice(0, 2, operationResult)
        mainDisplay.textContent = operationResult 
        return numbers
    }
}
