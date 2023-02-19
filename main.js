// Zilkumar Patel - zppatel1218@gmail.com
//
// S-Expression-Calculator
// command line program that acts as a calculator
//

main()

// main()
// get the expression from the argument, parse it and calculate it
function main(){
    const expression = process.argv[2]; // get the expression from the argument
    const expArray = parseInput(expression);
    const result = calculate(expArray);
    console.log(result);
}

// parseInput
// Input: string expression received from user
// Output: array containing operators, simple numbers and nested arrays
function parseInput(expression) {
    // deal with a simple number
    if (!isNaN(expression)){
        return expression;
    }

    // dealing with expressions
    // replace words with simples; add -> +, multiply -> *
    let newExp = replaceOp(expression);
    newExp = newExp.split(',');

    // transform into an array for calculation
    let i = 0;
    function parser() {
        let token = newExp[i++];
        if (token === "(") { // nested expression
            let subArray = [];
            while (newExp[i] !== ")"){
                subArray.push(parser())
            }
            i++; // skip the last closing bracket
            return subArray;
        } else if (!isNaN(token)){ // if token is number
            return parseFloat(token);
        } else {
            return token;
        }
    }

    return parser()
}

// replaceOp
// Input: string expression received from user
// Output: simplified string expression
function replaceOp(expression) {
    // replace words with symbols for easier computation
    // NOTE: for more functionality, add more operators and its symbol to the map,
    // and replacement value in the .replace function below
    const map = {
        add: "+",
        multiply: "*",
        '(' : "(,",
        ')' : ",)",
        " " : ","
    }

    return expression.replace(/add|multiply|[()]| /gi, function(matched){
        return map[matched];
    })
}

// calculate
// Input: array of expression / simple number
// Output: float/integer result of the calculation
function calculate(expression) {
    if (Array.isArray(expression)) {
        // Handle nested expressions by
        // recursively calculating the nested expressions
        const operator = expression[0];
        const operands = expression.slice(1).map(calculate);

        // calculates based on the operators in the expression
        // NOTE : to add new functionality add a new case and its associated return statement
        switch (operator) {
            // support for multiple numbers in argument
            case "+":
                return operands.reduce((acc, curr) => acc + curr);
            case "*":
                return operands.reduce((acc, curr) => acc * curr);
            default:
                throw new Error(`Operator: ${operator} is invalid`);
        }
    } else if (!isNaN(expression)) {
        // return simple numbers eg 45
        return parseFloat(expression);
    }
}
