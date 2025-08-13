const formCalculator = document.forms[0];
const buttonClear = document.getElementById("clearAll");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const mainInputs = [amountInput, termInput, rateInput];
const buttonsMortgageType = document.querySelectorAll("input[type='radio']");
const buttonCalculate = document.getElementById("calculate");
const displayBlock = document.querySelector(".half.second");
const smallElements = document.querySelectorAll("small");
const colorLimeLight = "hsla(61, 70%, 76%, .25)";
const colorLime = "hsl(61, 70%, 52%)";
const currency = "GBP";
const currentLocale = "en-GB";
    
const inputFields = document.querySelectorAll("input[type='text']");

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

buttonCalculate.addEventListener("click", () => {
    mainProcess();
});

buttonsMortgageType.forEach((button) => {
    button.addEventListener("click", function () {
        const inputContainer = this.closest("label");

        clearRadioBackground(buttonsMortgageType, "label");
        if (this.checked) {
            inputContainer.style.backgroundColor = colorLimeLight;
        }
    });
});

mainInputs.forEach(thisInput => {
    thisInput.addEventListener("input", function(){
        addBgOnInput(this);
    });
    thisInput.addEventListener("blur", function(){
        removeBgOnBlur(this);
    });
})

function clearDisplayBlock() {
    displayBlock.innerHTML = "";
}

function clearErrors(elements, parent) {
    elements.forEach((element) => {
        const parentLabel = element.closest("label");
        parentLabel.classList.remove("invalid");
        parentLabel.classList.remove("invalid-prefix-suffix");
    });
}

function clearForm() {
    formCalculator.reset();
    clearChecked(buttonsMortgageType);
    clearErrors(inputFields, "label");
    clearTextContent(smallElements);
    clearRadioBackground(buttonsMortgageType, "label");
    clearDisplayBlock();
    emptyResult();
}

function clearChecked(elements) {
    elements.forEach((element) => {
        element.checked = false;
    });
}

function clearTextContent(elements) {
    elements.forEach((element) => (element.textContent = ""));
}

function clearRadioBackground(elements, parent) {
    elements.forEach((element) => {
        const parentElement = element.closest(parent);
        parentElement.style.backgroundColor = "";
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

function addBgOnInput(element) {
    const parent = element.closest("label");
    const innerSpan = parent.querySelector("span");
    innerSpan.classList.add("active");
}

function removeBgOnBlur(element) {
    const parent = element.closest("label");
    const innerSpan = parent.querySelector("span");
    innerSpan.classList.remove("active");
}
amountInput.addEventListener("input", function () {
    this.value = integerInput(this.value);
});

termInput.addEventListener("input", function () {
    this.value = integerInput(this.value).substring(0, 2);
});


rateInput.addEventListener("input", function () {
    this.value = decimalInput(this.value).substring(0, 5);
});

function getRepaymentType() {
    const buttonChecked = [...buttonsMortgageType].filter((button) => button.checked);
    let result = buttonChecked[0].dataset?.option;
    return result;
}

function calculate(amount, term, rate, mortgageType = "repayment") {
    let monthlyPayment;
    let repayOver;
    const monthTerm = term * 12;

    const monthlyRate = rate / 100 / 12;
    if (mortgageType === "repayment") {
        monthlyPayment = (amount * monthlyRate * (1 + monthlyRate) ** monthTerm) / ((1 + monthlyRate) ** monthTerm - 1);
    } else if (mortgageType === "interest") {
        monthlyPayment = amount * monthlyRate;
    }
    repayOver = monthlyPayment * monthTerm;
    return [monthlyPayment.toFixed(2), repayOver.toFixed(2)];
}

function isValidInput(element) {
    const parentLabel = element.closest("label");
    const smallElement = parentLabel.nextElementSibling;
    if (!element.value) {
        smallElement.textContent = "This field is required";
        parentLabel.classList.add("invalid");
        parentLabel.classList.add("invalid-prefix-suffix");
        return false;
    } else {
        smallElement.textContent = "";
        parentLabel.classList.remove("invalid");
        parentLabel.classList.remove("invalid-prefix-suffix");
        return true;
    }
}

function isValidRadioElements(elements) {
    if (elements.length > 0) {
        const noneChecked = [...elements].every((element) => !element.checked);

        const parentLabel = elements[0].closest("label");
        const smallElement = parentLabel.nextElementSibling.nextElementSibling;
        if (noneChecked) {
            smallElement.textContent = "This field is required";
            return false;
        } else {
            smallElement.textContent = "";
            return true;
        }
    }
}

function showResult(monthly, total) {
    const formattedMonthly = new Intl.NumberFormat(currentLocale, {
        style: "currency",
        currency: currency,
    }).format(monthly);
    const formattedTotal = new Intl.NumberFormat(currentLocale, {
        style: "currency",
        currency: currency,
    }).format(total);


    clearDisplayBlock();
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("grd");
    resultDiv.classList.add("result");
    resultDiv.innerHTML = `<div>
                            <h2 class="text-preset-2">Your results</h2>
                            <p class="text-preset-4">
                                Your results are shown below based on the information you provided. To adjust the results,
                                edit the form and click “calculate repayments” again.
                            </p>
                        </div>
                        <div class="card grd">
                            <div>
                                <p class="text-preset-4">Your monthly repayments</p>
                                <p><span class="text-preset-1 big-numbers">${formattedMonthly}</span></p>
                            </div>
                            <hr>
                            <div>
                                <p class="text-preset-4">Total you'll repay over the term</p>
                                <p><span class="text-preset-2 small-numbers">${formattedTotal}</span></p>
                            </div>
                        </div>`;
    displayBlock.style.placeContent = "start";
    displayBlock.appendChild(resultDiv);
}

function mainProcess() {
    const validFields = [...inputFields].map((field) => isValidInput(field));
    const allValidRadioButtons = isValidRadioElements(buttonsMortgageType);
    const allValidFields = validFields.every((field) => field);

    if (allValidRadioButtons && allValidFields) {
        const amount = parseInt(amountInput.value);
        const years = parseInt(termInput.value);
        const interest = parseFloat(rateInput.value);
        const mortgageType = getRepaymentType();

        const [monthly, total] = calculate(amount, years, interest, mortgageType);
        showResult(monthly, total);
    }
}

emptyResult();
