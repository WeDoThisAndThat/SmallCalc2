// Calculator functionality
class Calculator {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.num1Input = document.getElementById('num1');
    this.num2Input = document.getElementById('num2');
    this.calculateButton = document.getElementById('calculate');
    this.resultDisplay = document.getElementById('result');
  }

  attachEventListeners() {
    this.calculateButton.addEventListener('click', () => this.calculate());
    
    // Allow calculation on Enter key press in inputs
    this.num1Input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.calculate();
    });
    
    this.num2Input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.calculate();
    });
  }

  /**
   * Adds two numbers together
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Gets values from inputs, performs addition, and displays result
   */
  calculate() {
    const num1 = parseFloat(this.num1Input.value);
    const num2 = parseFloat(this.num2Input.value);

    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
      this.displayResult('Please enter valid numbers');
      return;
    }

    const result = this.add(num1, num2);
    this.displayResult(result);
  }

  /**
   * Displays the result in the result element
   * @param {number|string} value - Result to display
   */
  displayResult(value) {
    this.resultDisplay.textContent = value;
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
