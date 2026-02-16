// Calculator tests
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    // Set up DOM elements for testing
    document.body.innerHTML = `
      <input type="number" id="num1" />
      <input type="number" id="num2" />
      <button id="calculate">Calculate</button>
      <div id="result"></div>
    `;
    calculator = new Calculator();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('add', () => {
    test('adds two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('adds two negative numbers correctly', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('adds positive and negative numbers correctly', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });

    test('adds decimal numbers correctly', () => {
      expect(calculator.add(2.5, 3.7)).toBeCloseTo(6.2);
    });

    test('adds zero correctly', () => {
      expect(calculator.add(5, 0)).toBe(5);
      expect(calculator.add(0, 5)).toBe(5);
      expect(calculator.add(0, 0)).toBe(0);
    });
  });

  describe('calculate', () => {
    test('calculates and displays result for valid inputs', () => {
      calculator.num1Input.value = '10';
      calculator.num2Input.value = '20';
      calculator.calculate();
      expect(calculator.resultDisplay.textContent).toBe('30');
    });

    test('handles decimal inputs', () => {
      calculator.num1Input.value = '1.5';
      calculator.num2Input.value = '2.5';
      calculator.calculate();
      expect(calculator.resultDisplay.textContent).toBe('4');
    });

    test('displays error message for invalid first input', () => {
      calculator.num1Input.value = 'abc';
      calculator.num2Input.value = '5';
      calculator.calculate();
      expect(calculator.resultDisplay.textContent).toBe('Please enter valid numbers');
    });

    test('displays error message for invalid second input', () => {
      calculator.num1Input.value = '5';
      calculator.num2Input.value = 'xyz';
      calculator.calculate();
      expect(calculator.resultDisplay.textContent).toBe('Please enter valid numbers');
    });

    test('displays error message for empty inputs', () => {
      calculator.num1Input.value = '';
      calculator.num2Input.value = '';
      calculator.calculate();
      expect(calculator.resultDisplay.textContent).toBe('Please enter valid numbers');
    });
  });

  describe('Event Listeners', () => {
    test('calculate button triggers calculation', () => {
      calculator.num1Input.value = '7';
      calculator.num2Input.value = '8';
      calculator.calculateButton.click();
      expect(calculator.resultDisplay.textContent).toBe('15');
    });

    test('Enter key in first input triggers calculation', () => {
      calculator.num1Input.value = '3';
      calculator.num2Input.value = '4';
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      calculator.num1Input.dispatchEvent(event);
      expect(calculator.resultDisplay.textContent).toBe('7');
    });

    test('Enter key in second input triggers calculation', () => {
      calculator.num1Input.value = '6';
      calculator.num2Input.value = '9';
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      calculator.num2Input.dispatchEvent(event);
      expect(calculator.resultDisplay.textContent).toBe('15');
    });
  });
});
