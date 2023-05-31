const calculatorScreen = document.querySelector('.calculator-screen-input');
let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

const updateScreen = (number) => {
  calculatorScreen.value = number;
};

const inputNumber = (number) => {
  if (currentNumber === '0') {
    currentNumber= number;
  } else {
    currentNumber += number;
  }
};

const inputOperator = (operator) => {
  if (calculationOperator === '') {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = '0';
};

const calculate = () => {
  let result = '';
  switch (calculationOperator) {
    case '+':
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case '-':
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case '*':
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case '/':
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      return;
  }
  currentNumber = result;
  calculationOperator = '';
};

const clearAll = () => {
  prevNumber = '';
  currentNumber = '0';
  calculationOperator = '';
};

const inputDecimal = (dot) => {
  if (currentNumber.includes('.')) {
    return;
  }
  currentNumber += dot;
};

const clearScreen = () => {
  calculatorScreen.value = '0';
};

const handleKeyPress = (event) => {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    inputNumber(key);
    updateScreen(currentNumber);
  } else if (key === '.') {
    inputDecimal(key);
   updateScreen(currentNumber);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    inputOperator(key);
  } else if (key === 'Enter') {
    calculate();
    updateScreen(currentNumber);
  } else if (key === 'c' || key === 'C') {
    clearAll();
    clearScreen();
  }
};

document.addEventListener('keydown', handleKeyPress);

const calculatorKeys = document.querySelector('.calculator-keys');
calculatorKeys.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) {
    inputOperator(target.value);
    return;
  }
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateScreen(currentNumber);
    return;
  }
  if (target.classList.contains('clear')) {
    clearAll();
    clearScreen();
    return;
  }
  if (target.classList.contains('equal')) {
    calculate();
    updateScreen(currentNumber);
    return;
  }
  inputNumber(target.value);
  updateScreen(currentNumber);
});
