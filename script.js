const formCalculator = document.forms[0];
const buttonClear = document.getElementById("clearAll");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("ratee");
const buttonsMortgageType = document.querySelectorAll("input[type='radio']");
const buttonCalculate = document.getElementById("calculate");
const displayBlock = document.querySelector(".half.second");

const emptyResult = () => {
    const emptyResultDiv = document.createElement("div");
    emptyResultDiv.classList.add("pending");
    emptyResultDiv.classList.add("grd");
    emptyResultDiv.innerHTML = `
    <img src="./assets/images/illustration-empty.svg" alt="">
                        <h2 class="text-preset-2">Results shown here</h2>
                        <p class="text-preset-4">
                            Complete the form and click “calculate repayments” to see what your monthly repayments would
                            be.
                        </p>
    `;
    displayBlock.style.placeContent = "center";
    displayBlock.appendChild(emptyResultDiv);
};


emptyResult();
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
