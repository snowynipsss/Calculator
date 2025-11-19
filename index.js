let display = document.getElementById('display');
let currentInput = '';
let expression = '';

function press(value) {
    if (value === '.') {
        if (!currentInput.includes('.')) {
            currentInput += value;
            display.textContent = currentInput || '0';
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput) {
            expression += currentInput + value;
            currentInput = '';
        } else if (expression && ['+', '-', '*', '/'].includes(expression.slice(-1))) {
            expression = expression.slice(0, -1) + value;
        }
    } else {
        currentInput += value;
        display.textContent = currentInput;
    }
}

function clearEntry() {
    currentInput = '';
    display.textContent = '0';
}

function clearAll() {
    currentInput = '';
    expression = '';
    display.textContent = '0';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
}

function plusMinus() {
    if (currentInput) {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        display.textContent = currentInput;
    }
}

function calculate() {
    if (expression || currentInput) {
        let fullExpression = expression + currentInput;
        try {
            let result = eval(fullExpression);
            if (result === Infinity || result === -Infinity) {
                display.textContent = 'Error';
            } else {
                display.textContent = result;
                currentInput = result.toString();
                expression = '';
            }
        } catch {
            display.textContent = 'Error';
            currentInput = '';
            expression = '';
        }
    }
}
