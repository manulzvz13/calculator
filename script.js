// Basic math operator functions

function add (numOne, numTwo) {
    return numOne + numTwo;
};

function subtract (numOne, numTwo) {
    return numOne - numTwo;
}

function multiply (numOne, numTwo) {
    return numOne * numTwo;
}

function divide(numOne, numTwo) {
  // Good practice: handle division by zero
  if (numTwo === 0) {
    return "Error: Cannot divide by zero!";
  }
  return numOne / numTwo;
}

// Function to make the different basic math functions with variables above

function operate (symbol, itemOne, itemTwo) {
    itemOne = Number(itemOne); // Ensure numbers for calculations
    itemTwo = Number(itemTwo); // Ensure numbers for calculations
    switch (symbol) {
        case '+':
            return add(itemOne, itemTwo);
        case '-':
            return subtract(itemOne, itemTwo);
        case '*':
            return multiply(itemOne, itemTwo);
        case '/':
            return divide(itemOne, itemTwo);
            
        default:
            alert('Please input a valid operation (+-*/)');
            return undefined;
    }
};

// Functions to populate the display when you click the digit buttons





