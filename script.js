const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

let firstVal = 0;
let operatorVal = '';
let nexValue = false;

function sendValue(number) {
    // console.log(number);
    // calculatorDisplay.textContent=number;
    // display value=0, replace else add
    if (nexValue) {
        calculatorDisplay.textContent = number;
        nexValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDec() {
    if (nexValue = true) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// the actual calc
const calculate = {
    '/': (firstNo, secondNo) => firstNo / secondNo,
    '*': (firstNo, secondNo) => firstNo * secondNo,
    '+': (firstNo, secondNo) => firstNo + secondNo,
    '-': (firstNo, secondNo) => firstNo - secondNo,
    '=': (firstNo, secondNo) => secondNo,
};

function useOperator(operator) {
    const currentVal = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (operatorVal && nexValue) {
        operatorVal = operator;
        return;
    }

    if (!firstVal) {
        firstVal = currentVal;
    } else {
        const res = calculate[operatorVal](firstVal, currentVal);
        calculatorDisplay.textContent = res;
        firstVal = res;
    }
    nexValue = true;
    operatorVal = operator;
}

// event listeners
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDec());
    }
});

// reset display
function resetAll() {
    firstVal = 0;
    operatorVal = '';
    nexValue = false;
    calculatorDisplay.textContent = '0';
}

// event listener
clearBtn.addEventListener('click', resetAll);
