document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('calculator-screen');
    const keys = document.querySelectorAll('.key');
    const toggleButton = document.getElementById('toggle-button');
    const simpleMode = document.querySelector('.simple-mode');
    const scientificMode = document.querySelector('.scientific-mode');
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let operatorClicked = false;
    let isDegree = true;

    // Function to update the screen
    function updateScreen(value) {
        screen.innerText = value;
    }

    // Function to calculate factorial
    function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // Function to convert degrees to radians
    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Toggle between simple and scientific mode
    toggleButton.addEventListener('click', () => {
        simpleMode.classList.toggle('hidden');
        scientificMode.classList.toggle('hidden');
        toggleButton.innerText = simpleMode.classList.contains('hidden') ? 'Simple' : 'Scientific';
    });

    // Handle calculator button clicks
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const action = key.getAttribute('data-action');

            // Handle clear
            if (action === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                operatorClicked = false;
                updateScreen('0');
                return;
            }

            // Handle delete
            if (action === 'delete') {
                currentInput = currentInput.slice(0, -1) || '0';
                updateScreen(currentInput);
                return;
            }

            // Handle equals
            if (action === 'equals') {
                if (operator && previousInput) {
                    currentInput = eval(`${previousInput}${operator}${currentInput}`);
                    currentInput = String(currentInput);
                    operator = '';
                    previousInput = '';
                    updateScreen(currentInput);
                    operatorClicked = false;
                }
                return;
            }

            // Handle operators
            if (['add', 'subtract', 'multiply', 'divide', 'power'].includes(action)) {
                if (!operatorClicked) {
                    if (previousInput && operator) {
                        currentInput = eval(`${previousInput}${operator}${currentInput}`);
                        currentInput = String(currentInput);
                    }
                    operatorClicked = true;
                    previousInput = currentInput;
                    operator = {
                        add: '+',
                        subtract: '-',
                        multiply: '*',
                        divide: '/',
                        power: '**'
                    }[action];
                    currentInput = '';
                    updateScreen(previousInput + ' ' + operator);
                } else {
                    operator = {
                        add: '+',
                        subtract: '-',
                        multiply: '*',
                        divide: '/',
                        power: '**'
                    }[action];
                    updateScreen(previousInput + ' ' + operator);
                }
                return;
            }

            // Handle decimal
            if (action === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateScreen(previousInput + ' ' + operator + ' ' + currentInput);
                return;
            }

            // Handle numbers
            if (action >= '0' && action <= '9') {
                currentInput = operatorClicked ? action : currentInput + action;
                operatorClicked = false;
                updateScreen(previousInput + ' ' + operator + ' ' + currentInput);
                return;
            }

            // Handle scientific functions
            if (['sin', 'cos', 'tan', 'log', 'ln', 'exp', 'sqrt', 'factorial', 'pi', 'e', 'sinh', 'cosh', 'tanh', 'asin', 'acos', 'atan'].includes(action)) {
                let result;
                switch (action) {
                    case 'sin':
                        result = isDegree ? Math.sin(degToRad(currentInput)) : Math.sin(currentInput);
                        break;
                    case 'cos':
                        result = isDegree ? Math.cos(degToRad(currentInput)) : Math.cos(currentInput);
                        break;
                    case 'tan':
                        result = isDegree ? Math.tan(degToRad(currentInput)) : Math.tan(currentInput);
                        break;
                    case 'log':
                        result = Math.log10(currentInput);
                        break;
                    case 'ln':
                        result = Math.log(currentInput);
                        break;
                    case 'exp':
                        result = Math.exp(currentInput);
                        break;
                    case 'sqrt':
                        result = Math.sqrt(currentInput);
                        break;
                    case 'factorial':
                        result = factorial(parseInt(currentInput));
                        break;
                    case 'pi':
                        result = Math.PI;
                        break;
                    case 'e':
                        result = Math.E;
                        break;
                    case 'sinh':
                        result = Math.sinh(currentInput);
                        break;
                    case 'cosh':
                        result = Math.cosh(currentInput);
                        break;
                    case 'tanh':
                        result = Math.tanh(currentInput);
                        break;
                    case 'asin':
                        result = isDegree ? (Math.asin(currentInput) * (180 / Math.PI)) : Math.asin(currentInput);
                        break;
                    case 'acos':
                        result = isDegree ? (Math.acos(currentInput) * (180 / Math.PI)) : Math.acos(currentInput);
                        break;
                    case 'atan':
                        result = isDegree ? (Math.atan(currentInput) * (180 / Math.PI)) : Math.atan(currentInput);
                        break;
                }
                updateScreen(result);
                currentInput = String(result);
                return;
            }

            // Handle degree/radian toggle
            if (action === 'degRad') {
                isDegree = !isDegree;
                key.innerText = isDegree ? 'Deg' : 'Rad';
                return;
            }
        });
    });
});
