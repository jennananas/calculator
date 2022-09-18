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

console.log(operate("cjd",1,45))