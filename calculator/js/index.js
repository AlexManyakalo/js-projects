// input/output result
let input = document.querySelector(".calc__head-input");
let output = document.querySelector(".calc__head-num");

// all buttons
const numbersList = document.querySelector(".calc__list");
const numbers = numbersList.querySelectorAll(".btn");

// Global variables
let result = 0;
let currentInput = "";

// Functions
function selectOperation(op) {
  return `<span class="calc__head-operation"> ${op} </span>`;
}

function updateInput() {
  input.innerHTML = "";
  for (let i = 0; i < currentInput.length; i++) {
    if (["+", "-", "*", "/", "%"].includes(currentInput[i]))
      input.innerHTML += selectOperation(currentInput[i]);
    else input.innerHTML += currentInput[i];
  }
}

// Events
numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    switch (value) {
      case "CE":
        result = 0;
        output.textContent = result;
        currentInput = "";
        input.innerHTML = "";
        break;
      case "=":
        output.textContent = result;
        result = 0;
        break;
      case "⇐":
        currentInput = currentInput.slice(0, -1);
        updateInput();
        break;
      default:
        currentInput += value;
        updateInput();
        break;
    }
  });
});
