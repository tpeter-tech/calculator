// ==========================================================================
// 1. CORE MATH FUNCTIONS (Milestone 1)
// ==========================================================================

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Nice try!"; // Handles the snarky divide by zero check early!
    return a / b;
}

// ==========================================================================
// 2. THE OPERATE ROUTER
// ==========================================================================
function operate(operator, firstNum, secondNum) {
    // Convert inputs to numbers just to be completely safe from string concatenation
    const num1 = Number(firstNum);
    const num2 = Number(secondNum);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

// ==========================================================================
// 3. CALCULATOR ENGINE STATE VARIABLES (Milestone 3)
// ==========================================================================
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false; // Tracks if the next digit pressed should clear the display

// Grab our DOM Screen Display element
const displayScreen = document.querySelector("#display");

// Clear out the dummy placeholder text when the script runs to start completely fresh
displayScreen.textContent = "0";

// ==========================================================================
// 4. CORE ENGINE CORE LOGIC FUNCTIONS
// ==========================================================================

function appendNumber(number) {
    // If the screen displays 0 or needs a fresh reset, clear it out first
    if (displayScreen.textContent === "0" || shouldResetScreen) {
        resetScreen();
    }
    
    // Extra Credit: Prevent users from typing multiple decimal dots in a row (e.g., 12.3.4)
    if (number === "." && displayScreen.textContent.includes(".")) return;

    displayScreen.textContent += number;
}

function resetScreen() {
    displayScreen.textContent = "";
    shouldResetScreen = false;
}

function setOperator(operator) {
    // Gotcha Check: If an operator is already clicked and the user has typed a second number,
    // evaluate the first pair immediately before setting up the next operator! (e.g., 12 + 7 - 1)
    if (currentOperator !== null && !shouldResetScreen) {
        evaluatePair();
    }

    firstOperand = displayScreen.textContent;
    currentOperator = operator;
    shouldResetScreen = true; // Tells the engine: "The next digit typed belongs to the second operand!"
}

function evaluatePair() {
    // Don't evaluate if no operator was selected or if screen is waiting for second input
    if (currentOperator === null || shouldResetScreen) return;

    secondOperand = displayScreen.textContent;
    
    // Call our Milestone 1 math router!
    const result = operate(currentOperator, firstOperand, secondOperand);
    
    // Round long decimal answers so they don't break our container layout width
    displayScreen.textContent = roundResult(result);
    
    // Reset our memory states so the calculation chain can continue seamlessly
    firstOperand = displayScreen.textContent;
    currentOperator = null;
    
    // FIXED: Tell the engine to clear the screen if a number button is pressed next!
    shouldResetScreen = true; 
}

function roundResult(number) {
    // If the answer is an error message string or an integer, return it directly
    if (isNaN(number)) return number;
    // Otherwise, round it smoothly to 4 decimal places maximum
    return Math.round(number * 10000) / 10000;
}

function clearCalculator() {
    displayScreen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
}

function runBackspace() {
    // Slice off the last character on the screen string
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    // If the screen ends up completely empty, default it back to a clean 0
    if (displayScreen.textContent === "") {
        displayScreen.textContent = "0";
    }
}

// ==========================================================================
// 5. WIRE UP BUTTON CLICKS VIA EVENT LISTENERS
// ==========================================================================

// Wire up Number buttons (0-9 and .)
document.querySelectorAll(".num-btn").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.value));
});

// Wire up Operator buttons (+, -, *, /)
document.querySelectorAll(".operator-btn").forEach(button => {
    button.addEventListener("click", () => setOperator(button.value));
});

// Wire up Special function buttons (Clear, Backspace, Equals)
document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("backspace").addEventListener("click", runBackspace);
document.getElementById("equals").addEventListener("click", evaluatePair);

// ==========================================================================
// 6. KEYBOARD SUPPORT (Extra Credit Milestone)
// ==========================================================================
window.addEventListener("keydown", (e) => {
    // Number keys and decimal dot
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        appendNumber(e.key);
    }
    
    // Operators (Map standard keys to our math logic symbols)
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        setOperator(e.key);
    }
    
    // Equals and Enter keys execute the evaluation
    if (e.key === "=" || e.key === "Enter") {
        e.preventDefault(); // Prevents Enter from accidentally re-clicking the last mouse-focused button
        evaluatePair();
    }
    
    // Backspace key
    if (e.key === "Backspace") {
        runBackspace();
    }
    
    // Escape key maps to CLEAR
    if (e.key === "Escape") {
        clearCalculator();
    }
});