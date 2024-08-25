document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let operator = '';
    let firstOperand = null;

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const value = button.textContent;

                if (value >= '0' && value <= '9' || value === '.') {
                    currentInput += value;
                    display.textContent = currentInput;
                } else if (value === 'C') {
                    currentInput = '';
                    operator = '';
                    firstOperand = null;
                    display.textContent = '';
                } else if (value === '=') {
                    if (operator && firstOperand !== null) {
                        currentInput = calculate(firstOperand, currentInput, operator);
                        display.textContent = currentInput;
                        operator = '';
                        firstOperand = null;
                    }
                } else {
                    if (firstOperand === null) {
                        firstOperand = currentInput;
                        operator = value;
                        currentInput = '';
                    } else if (operator && currentInput !== '') {
                        currentInput = calculate(firstOperand, currentInput, operator);
                        display.textContent = currentInput;
                        operator = value;
                        firstOperand = currentInput;
                        currentInput = '';
                    }
                }
            });
        });

        function calculate(operand1, operand2, operator) {
            const num1 = parseFloat(operand1);
            const num2 = parseFloat(operand2);

            switch (operator) {
                case '+':
                    return (num1 + num2).toString();
                case '-':
                    return (num1 - num2).toString();
                case '*':
                    return (num1 * num2).toString();
                case '/':
                    return (num1 / num2).toString();
                default:
                    return '';          
            }
        }
});
