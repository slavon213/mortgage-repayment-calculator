const formCalculator = document.forms[0];
const buttonClear = document.getElementById("clearAll");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
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



function decimalInput(value) {
    value = value.replace(/[^\d.]+/g, "");
    const parts = value.split(".");

    if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1, 3).join("");
    }

    if (value.includes(".")) {
        const dotIndex = value.indexOf(".");
        const intPart = value.substring(0, dotIndex);
        let decimalPart = value.substring(dotIndex + 1);

        if (decimalPart.length > 2) {
            decimalPart = decimalPart.substring(0, 2);
        }

        value = intPart + "." + decimalPart;
    }

    return value;
}


function integerInput(value) {
    value = value.replace(/[^\d]+/g, "");
    return value;
}



amountInput.addEventListener("input", function(){
    this.value = integerInput(this.value);
})

termInput.addEventListener("input", function(){
    this.value = integerInput(this.value).substring(0, 2);
})

rateInput.addEventListener("input", function(){
    this.value = decimalInput(this.value).substring(0,5);
})

emptyResult();
