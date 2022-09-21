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
    if(b==0){
        alert("You can't divide by 0") 
        return 0
    } else {
        return  a/b
    }
       
}

const operate = function(operator, a, b){
    switch(operator){
        case "+" :
            return add(a,b);
        case "-" : 
            return subtract(a,b);
        case "*" : 
            return multiply(a,b);
        case "/" : 
            return divide(a,b);
        default : 
            return "Invalid operator"
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
let prevOp = currentOp = numbTemp = ""
let operationResult = 0
let allNumbers = []
let isClicked = false
mainDisplay.innerHTML = `<p>0</p>`

clearButton.addEventListener("click", () => {
    prevOp = currentOp = numbTemp = ""
    operationResult = 0
    allNumbers = []
    mainDisplay.innerHTML = `<p>0</p>`
    secondDisplay.innerHTML = `<p></p>`
    isClicked = false
})

operands.forEach(operand => operand.addEventListener("click", () => {
    numbTemp = numbTemp + operand.value
    if (!parseFloat(numbTemp)){
        if(numbTemp.includes(".")){
            mainDisplay.innerHTML = `<p>${numbTemp}</p>`
        } else {
            mainDisplay.innerHTML = `<p>0</p>`
        }
        
    } else {
        mainDisplay.innerHTML = `<p>${parseFloat(numbTemp)}</p>`
    }
}))

decimal.addEventListener("click", () => {
    if (!isClicked){
        if (!numbTemp){
            numbTemp = "0"
        }
        numbTemp = numbTemp + "."
        mainDisplay.innerHTML = `<p>${numbTemp}</p>`
        isClicked = true
    }  
})

operators.forEach(operator => operator.addEventListener("click", () => {
    numbTemp = parseFloat(numbTemp)
    if (!numbTemp){
        if (!allNumbers[0]) {
            secondDisplay.innerHTML = `<p>0 ${operator.value}</p>`
        }
        else {
            secondDisplay.innerHTML = `<p>${allNumbers[0]} ${operator.value}</p>`
        }
    } else {
        allNumbers = allNumbers.concat(numbTemp)
        numbTemp = ""
        if (!currentOp){
            currentOp = operator.value
        } else {
            prevOp = currentOp
            currentOp = operator.value
        }
        if (allNumbers.length==2){
            operationResult = operate(prevOp, allNumbers[0], allNumbers[1])
            operationResult = Math.round((operationResult + Number.EPSILON) * 100000) / 100000
            allNumbers.splice(0, 2, operationResult)
            mainDisplay.innerHTML = `<p>${allNumbers[0]}</p>`
        }
        secondDisplay.innerHTML = `<p>${allNumbers[0]} ${currentOp}</p>`
    }
    isClicked = false
}))

result.addEventListener("click", () => {
    numbTemp = parseFloat(numbTemp)
    if (allNumbers[0] == null || !currentOp){
        `<p>0</p>`
    } else {
        let finalResult = operate(currentOp, allNumbers[0], numbTemp)
        finalResult = Math.round((finalResult + Number.EPSILON) * 100000) / 100000
        mainDisplay.innerHTML = `<p>${finalResult}</p>`
        secondDisplay.innerHTML = `<p>${allNumbers[0]} ${currentOp} ${numbTemp} =</p>`
    }
})

