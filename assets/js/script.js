let currentNumber = '';
let previousNumber = '';
let operation = null;
const display = document.querySelector('.display');

function appendNumber(number) {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
}

function calculate() {
    if (previousNumber === '' || currentNumber === '') return;
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    switch(operation) {
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
            if (current === 0) {
                alert('Cannot divide by zero');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentNumber = roundResult(result).toString();
    operation = null;
    previousNumber = '';
    updateDisplay();
}

function roundResult(number) {
    // Round to 8 decimal places to avoid floating point issues
    return Math.round(number * 100000000) / 100000000;
}

function clearDisplay() {
    currentNumber = '0';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    if (operation) {
        display.textContent = `${previousNumber} ${operation} ${currentNumber || ''}`;
    } else {
        display.textContent = currentNumber;
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌞';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '🌙';
    }
}

// Initialize display
updateDisplay();