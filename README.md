# Simple Calculator

A web-based calculator with comprehensive input validation and error handling.

## Features

- Basic arithmetic operations (+, -, *, /)
- Decimal number support
- Keyboard input support
- Input validation and error handling
- Responsive design

## Input Validation

The calculator implements the following validation rules:

### Number Validation
- Validates that inputs are valid numbers
- Checks for `NaN`, `null`, `undefined`, and empty strings
- Prevents infinite values

### Edge Cases Handled
- **Division by Zero**: Displays "Error: Division by zero"
- **Multiple Decimal Points**: Prevents entering more than one decimal point
- **Invalid Input**: Catches and displays errors for invalid number formats
- **Overflow**: Detects and handles results that are too large
- **Floating Point Precision**: Rounds results to 8 decimal places

### Error Messages
- `Error: Invalid input` - When input is not a valid number
- `Error: Invalid number` - When number parsing fails
- `Error: Division by zero` - When attempting to divide by zero
- `Error: Result too large` - When result exceeds JavaScript number limits
- `Error: Calculation failed` - For unexpected calculation errors

## Usage

### Mouse/Touch
- Click number buttons to input digits
- Click operator buttons (+, -, *, /) to select operation
- Click "=" to calculate result
- Click "C" to clear
- Click "←" to delete last character

### Keyboard
- `0-9` and `.` for numbers
- `+`, `-`, `*`, `/` for operations
- `Enter` or `=` to calculate
- `Escape` or `C` to clear
- `Backspace` to delete last character

## Testing

Open `test.html` in a browser to run the validation test suite. Tests cover:
- Number validation
- Empty/null/undefined handling
- Division by zero
- Multiple decimal points
- Basic calculations
- Floating point precision

## Browser Support

Works in all modern browsers that support ES6+:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Error Recovery

When an error occurs:
1. An error message is displayed
2. Calculator state is automatically reset
3. User can continue using the calculator normally

## Files

- `index.html` - Main calculator interface
- `style.css` - Styling and responsive design
- `script.js` - Calculator logic with validation
- `test.html` - Validation test suite
- `README.md` - Documentation

## Development

The calculator follows defensive programming practices:
- Try-catch blocks around event handlers
- Input validation before calculations
- Graceful error handling and recovery
- User-friendly error messages
