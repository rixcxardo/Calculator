document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '0'; //initially set to 0.
    let operator = '';
    let firstOperand = null;
    let newInputStarted = false; //to trace if input is started.

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const value = button.textContent;

                if (value >= '0' && value <= '9') {
                    if (currentInput === '0' || display.textContent === 'NaN') {
                            //transform '0' or 'NaN' into the first written input.
                        currentInput = value;
                    } else {
                            //add the number into the display.
                        currentInput += value;
                    }
                    display.textContent = currentInput;
                    newInputStarted = true;
                } else if (value === '.') {
                    if (display.textContent === 'NaN') {
                            //if there is 'NaN', reset all and return to '0'.
                        currentInput = '0.';
                    } else if (!currentInput.includes('.')) {
                            //add '.' only if it hasn't already been added.
                        currentInput += value;
                    }
                    display.textContent = currentInput;
                    newInputStarted = true;
                } else if (value === 'C') {
                        //reset the Input (string) in the display.
                    currentInput = '0';
                    operator = '';
                    firstOperand = null;
                    newInputStarted = false;
                    display.textContent = '0';
                } else if (value === '=') {
                        //calculate the result.
                    if (operator && firstOperand !== null) {
                        currentInput = calculate(firstOperand, currentInput, operator);
                        display.textContent = currentInput;
                        operator = '';
                        firstOperand = null;
                        newInputStarted = false;
                    }
                 } else { //control the operations (+, -, *, /).
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
                    newInputStarted = false; //reset for a new Input.
                 }
            });
        });

        function calculate(operand1, operand2, operator) {
            const num1 = parseFloat(operand1);
            const num2 = parseFloat(operand2);

            if (isNaN(num1) || isNaN(num2)) {
                return 'NaN'; //return NaN (Not a Number) if the operation isn't valid.
            }

            switch (operator) { //do the operations and then transforms it into string.
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
