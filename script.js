const formCalculator = document.forms[0];
const buttonClear = document.getElementById("clearAll");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("ratee");
const buttonsMortgageType = document.querySelectorAll("input[type='radio']");
const buttonCalculate = document.getElementById("calculate");


buttonClear.addEventListener("click", clearForm);










function clearForm() {
    formCalculator.reset();
    clearChecked(buttonsMortgageType);
}

function clearChecked(elements) {
    elements.forEach((element) => {
        element.checked = false;
    });
}
