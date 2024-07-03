const counterValue = document.getElementById('counterValue');
let previousData = localStorage.getItem("Sum");
let storedValue = localStorage.getItem("storedValue");
let optionValue = document.getElementById('selectNum');
let sum = 0;

function loadPage() {
    if (previousData) {
        sum = previousData;
        counterValue.innerText = sum;
    }
    if (storedValue) {
        optionValue.value = storedValue;
    }
};
loadPage();

optionValue.addEventListener('change', () => localStorage.setItem("storedValue", optionValue.value));

document.getElementById('increment').addEventListener('click', () => {
    let optionValue = +document.getElementById('selectNum').value;
    switch (optionValue) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            sum = Number(counterValue.innerText) + optionValue;
            counterValue.innerText = sum;
            localStorage.setItem("Sum", sum);
            break;
        default:
            break;
    }
});

document.getElementById('decrement').addEventListener('click', () => {
    let optionValue = +document.getElementById('selectNum').value;
    switch (optionValue) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            sum = Number(counterValue.innerText) - optionValue;
            counterValue.innerText = sum;
            localStorage.setItem("Sum", sum);
            break;
        default:
            break;
    }
});

document.getElementById('multiply').addEventListener('click', () => {
    let optionValue = +document.getElementById('selectNum').value;
    switch (optionValue) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            sum = Number(counterValue.innerText) * optionValue;
            counterValue.innerText = sum;
            localStorage.setItem("Sum", sum);
            break;
        default:
            break;
    }
});

document.getElementById('divide').addEventListener('click', () => {
    let optionValue = +document.getElementById('selectNum').value;
    switch (optionValue) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            sum = Number(counterValue.innerText) / optionValue;
            counterValue.innerText = sum;
            localStorage.setItem("Sum", sum);
            break;
        default:
            break;
    }
});
document.getElementById('reset').addEventListener('click', () => {
    localStorage.removeItem("Sum");
    localStorage.removeItem("storedValue");
    sum = 0;
    counterValue.innerText = "";
    optionValue.value = null;
});