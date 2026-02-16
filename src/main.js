import { add } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculate');
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const resultElement = document.getElementById('result');

  calculateButton.addEventListener('click', () => {
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;
    const result = add(num1, num2);
    resultElement.textContent = result;
  });
});
