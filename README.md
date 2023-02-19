# Zilkumar Patel
# S- Expression Calculator

A command line program that acts as a simple calculator: it takes a single argument as an expression and prints out the integer result.

## How to run

1. Ensure you have node.js installed. If not, you can install node.js by following [this link.](https://nodejs.org/en/)
2. Go the folder containing the `main.js` file.
3. Write the command: `node ./main.js {expression}`.

Assuming everything went well, this is how sample output should look like: 
```
> node ./main.js 43
43

> node ./main.js "(add 12 12)"
24

> node ./main.js "(multiply 2 (add (multiply 2 3) 8))"
28
``` 
