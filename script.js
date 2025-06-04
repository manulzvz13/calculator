// Basic math operator functions (from before)
function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  if (numTwo === 0) {
    return "Error: Cannot divide by zero!"; // Or handle as an error message
  }
  return numOne / numTwo;
}

// Function to make the different basic math functions with variables above
function operate(symbol, itemOne, itemTwo) {
  itemOne = Number(itemOne); // Ensure numbers for calculations
  itemTwo = Number(itemTwo); // Ensure numbers for calculations

  switch (symbol) {
    case "+":
      return add(itemOne, itemTwo);
    case "-":
      return subtract(itemOne, itemTwo);
    case "X":
      return multiply(itemOne, itemTwo);
    case "/":
      return divide(itemOne, itemTwo);
    default:
      return "Invalid Operation"; // Return a string for invalid input
  }
}

// --- NEW JAVASCRIPT FOR DISPLAY LOGIC ---

// 1. Get DOM Elements
const displayInterface = document.getElementById("interface");
const digitButtons = document.querySelectorAll(
  "#one, #two, #three, #four, #five, #six, #seven, #eight, #nine, #cero",
); // Using specific IDs
const dotButton = document.getElementById("dot");
const clearButton = document.getElementById("clear");
const operatorButtons = document.querySelectorAll(
  "#plus, #minus, #product, #division",
);
const equalButton = document.getElementById("equal");

// 2. Initialize Variables for Calculator State
let currentInput = ""; // Stores the number currently being typed by the user
let firstOperand = null; // Stores the first number in the calculation
let operator = null; // Stores the selected operator (+, -, *, /)
let waitingForSecondOperand = false; // Flag to know if we're starting a new number

// 3. Functions to Handle Button Clicks

// Function to update the display
function updateDisplay() {
  displayInterface.textContent = currentInput || "0"; // Show current input, or '0' if empty
}

// Handle digit clicks (0-9)
function inputDigit(digit) {
  if (waitingForSecondOperand) {
    // If we're waiting for the second number, start a new input
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    // Prevent multiple leading zeros (e.g., '0005')
    if (currentInput === "0" && digit === "0") return;
    // Overwrite initial '0' if user types another digit
    if (currentInput === "0") {
      currentInput = digit;
    } else {
      currentInput += digit; // Append digit to current input
    }
  }
  updateDisplay(); // Update the actual HTML display
}

// Handle decimal point click
function inputDecimal(dot) {
  if (waitingForSecondOperand) {
    currentInput = "0."; // If starting a new number, start with "0."
    waitingForSecondOperand = false;
  } else if (!currentInput.includes(dot)) {
    // Only add decimal if it's not already there
    currentInput += dot;
  }
  updateDisplay();
}

// Handle operator clicks (+, -, *, /)
function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput); // Convert current input to a number

  if (operator && waitingForSecondOperand) {
    // If an operator was already pressed and we're just changing it
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    // If this is the first number, store it
    firstOperand = inputValue;
  } else if (operator) {
    // If it's a subsequent operation, calculate the result
    const result = operate(operator, firstOperand, inputValue);

    if (String(result).includes("Error")) {
      // Handle division by zero or other errors
      displayInterface.textContent = result;
      // Reset state for error
      currentInput = "";
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      return;
    }

    currentInput = String(
      Math.round(result * 100000000) / 100000000,
    ); // Round to prevent floating point inaccuracies
    firstOperand = parseFloat(currentInput);
  }

  waitingForSecondOperand = true; // Set flag to start new number
  operator = nextOperator; // Store the new operator
  updateDisplay();
}

// Handle equals button click
function handleEquals() {
  if (operator === null || waitingForSecondOperand) {
    return; // Do nothing if no operation selected or waiting for second operand
  }

  const inputValue = parseFloat(currentInput);
  const result = operate(operator, firstOperand, inputValue);

  if (String(result).includes("Error")) {
    displayInterface.textContent = result;
    // Reset state for error
    currentInput = "";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    return;
  }

  currentInput = String(Math.round(result * 100000000) / 100000000); // Round
  firstOperand = null; // Reset for next calculation
  operator = null; // Reset operator
  waitingForSecondOperand = true; // Ready for new number after result
  updateDisplay();
}

// Handle clear (AC) button click
function clearCalculator() {
  currentInput = "";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay(); // Reset display to '0'
}

// 4. Add Event Listeners

// For digit buttons
digitButtons.forEach((button) => {
  button.addEventListener("click", () => inputDigit(button.textContent));
});

// For dot button
dotButton.addEventListener("click", () => inputDecimal(dotButton.textContent));

// For clear button
clearButton.addEventListener("click", clearCalculator);

// For operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

// For equals button
equalButton.addEventListener("click", handleEquals);

// Initial display setup
updateDisplay();