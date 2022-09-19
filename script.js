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


const buttons = document.querySelectorAll("input")
const display = document.querySelector(".screen")
let operator = temp = ""
let allNumbers = []
let prevOp, currentOp, tempOp, result = null
buttons.forEach(button => button.addEventListener('click', () => {
    const clickedValue = button.value ; 
    // console.log(typeof clickedValue)
        if(clickedValue === "clear") {
            display.innerHTML = " "
            allNumbers = operator = temp = result = ""
        }
        if(parseFloat(clickedValue)) {
            if (allNumbers.length==1){
                result = operate(currentOp, parseFloat(allNumbers[0]), parseInt(clickedValue))
                allNumbers.splice(0, 1, result)
                display.innerHTML = `<p>${result}</p>`
            }
            else {
                temp = temp.concat(clickedValue)
                display.innerHTML = `<p>${temp}</p>`
            }

        }
        if(['+', '-', '*', '/'].includes(clickedValue)){
            if (currentOp == null) {
                currentOp = clickedValue;
                display.innerHTML = `<p>${temp}${currentOp}</p>`
            } else {
                prevOp = currentOp
                currentOp = clickedValue
                display.innerHTML = `<p>${result}${currentOp}</p>`
            }
            if (temp){
                allNumbers = allNumbers.concat(temp)
            }    
            temp = ""
        }
        if(clickedValue == "."){
            temp+='.'
            display.innerHTML = `<p>${temp}</p>`
        }
    })
)
