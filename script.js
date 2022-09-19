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
    return b===0 ? "ERROR" : a/b
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


// const operands = document.querySelectorAll(".operand")
// const operators = document.querySelectorAll(".operator")
// const clear = document.querySelector(".clearButton")
// const result = document.querySelector(".result")
const display = document.querySelector(".screen")
const buttons = document.querySelectorAll("input")
let operator = temp = ""
let allNumbers = []
let prevOp, currentOp, tempOp, result = null
buttons.forEach(button => button.addEventListener('click', () => {
    const clickedValue = button.value ;
        if(clickedValue === "clear") {
            display.innerHTML = " "
            allNumbers = operator = temp = result = ""
        }
        if(parseInt(clickedValue)) { // Si je clique sur un chiffre
            temp = temp.concat(clickedValue)
            display.innerHTML = `<p>${temp}</p>`
        }
        if(clickedValue == "."){
            if (!temp) {
                temp+='0.'
            }
            else {
                temp+='.'
            }
            display.innerHTML = `<p>${temp}</p>`
        }
        if(['+', '-', '*', '/', '='].includes(clickedValue)){
            if (currentOp == null) {
                currentOp = clickedValue
            } else {
                prevOp = currentOp
                currentOp = clickedValue
            }
            
            
            if (temp) {
                allNumbers = allNumbers.concat(temp)
                temp=""
            }
            display.innerHTML = `<p>${allNumbers[0]}${currentOp}</p>`
            if (allNumbers.length == 2){
                result = operate(prevOp, parseFloat(allNumbers[0]), parseFloat(allNumbers[1]))
                result = Math.round((result + Number.EPSILON) * 100000) / 100000
                allNumbers.splice(0, 2, result)
                if (clickedValue == "="){
                    display.innerHTML = `<p>${result}</p>`
                } else {
                    display.innerHTML = `<p>${result}${currentOp}</p>`
                }
                
            }
            console.log(allNumbers)
            console.log(clickedValue)
        } 
}))
