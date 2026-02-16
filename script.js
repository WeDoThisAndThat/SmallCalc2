// Calculator functionality
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalsBtn = document.getElementById('equals');

let currentInput = '';
let previousInput = '';
let operation = null;

// Update display with error handling
function updateDisplay(value) {
    if (display) {
        display.value = value || '0';
    }
}

// Validate if input is a valid number
function isValidNumber(value) {
    if (value === '' || value === null || value === undefined) {
        return false;
    }
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
}

// Handle number input with validation
function handleNumberInput(num) {
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Prevent leading zeros (except for decimals like 0.5)
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay(currentInput);
}

// Handle operator input with validation
function handleOperator(op) {
    // If there's no current input, use previous result if available
    if (!currentInput && !previousInput) {
        return;
    }
    
    // If we already have an operation pending, calculate first
    if (currentInput && previousInput && operation) {
        calculate();
    }
    
    // Set up for next operation
    if (currentInput) {
        previousInput = currentInput;
        currentInput = '';
    }
    operation = op;
}

// Perform calculation with comprehensive error handling
function calculate() {
    let result;
    
    // Validate inputs
    if (!isValidNumber(previousInput)) {
        updateDisplay('Error: Invalid input');
        reset();
        return;
    }
    
    if (!isValidNumber(currentInput) && operation) {
        updateDisplay('Error: Invalid input');
        reset();
        return;
    }
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    // Handle edge cases
    if (isNaN(prev) || isNaN(current)) {
        updateDisplay('Error: Invalid number');
        reset();
        return;
    }
    
    // Perform calculation based on operation
    try {
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                // Handle division by zero
                if (current === 0) {
                    updateDisplay('Error: Division by zero');
                    reset();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Check for overflow or invalid results
        if (!isFinite(result)) {
            updateDisplay('Error: Result too large');
            reset();
            return;
        }
        
        // Round to prevent floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        currentInput = result.toString();
        operation = null;
        previousInput = '';
        updateDisplay(currentInput);
        
    } catch (error) {
        updateDisplay('Error: Calculation failed');
        reset();
    }
}

// Reset calculator state
function reset() {
    currentInput = '';
    previousInput = '';
    operation = null;
}

// Clear display and reset
function clearDisplay() {
    reset();
    updateDisplay('0');
}

// Delete last character with validation
function deleteLastChar() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }
}

// Event listeners with error handling
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        try {
            const value = e.target.dataset.num;
            
            if (value !== undefined) {
                handleNumberInput(value);
            }
        } catch (error) {
            console.error('Button click error:', error);
            updateDisplay('Error');
        }
    });
});

// Operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => {
        try {
            const op = e.target.dataset.operator;
            if (op) {
                handleOperator(op);
            }
        } catch (error) {
            console.error('Operator error:', error);
            updateDisplay('Error');
        }
    });
});

// Clear button
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        try {
            clearDisplay();
        } catch (error) {
            console.error('Clear error:', error);
        }
    });
}

// Delete button
if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        try {
            deleteLastChar();
        } catch (error) {
            console.error('Delete error:', error);
        }
    });
}

// Equals button
if (equalsBtn) {
    equalsBtn.addEventListener('click', () => {
        try {
            if (operation && currentInput && previousInput) {
                calculate();
            }
        } catch (error) {
            console.error('Calculation error:', error);
            updateDisplay('Error');
            reset();
        }
    });
}

// Keyboard support with validation
document.addEventListener('keydown', (e) => {
    try {
        // Numbers and decimal point
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            handleNumberInput(e.key);
        }
        
        // Operators
        if (['+', '-', '*', '/'].includes(e.key)) {
            handleOperator(e.key);
        }
        
        // Enter or equals
        if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            if (operation && currentInput && previousInput) {
                calculate();
            }
        }
        
        // Escape or clear
        if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            clearDisplay();
        }
        
        // Backspace or delete
        if (e.key === 'Backspace') {
            e.preventDefault();
            deleteLastChar();
        }
    } catch (error) {
        console.error('Keyboard error:', error);
        updateDisplay('Error');
    }
});

// Initialize display
updateDisplay('0');
