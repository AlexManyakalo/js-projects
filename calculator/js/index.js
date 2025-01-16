/*============== GLOBAL ===============*/

// input/output of results
let input = document.querySelector(".calc__head-input");
let output = document.querySelector(".calc__head-num");

// all buttons
const numbersList = document.querySelector(".calc__list");
const numbers = numbersList.querySelectorAll(".btn");

// variables for calculations
let result = 0;
let currentInput = "";
const operations = new Set(["+", "-", "*", "/", "%"]);
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);

/*============== FUNCTIONS ===============*/

function selectOperation(op) {
  return `<span class="calc__head-operation"> ${op} </span>`;
}

function updateInput() {
  input.innerHTML = "";
  for (let i = 0; i < currentInput.length; i++) {
    if (operations.has(currentInput[i]))
      input.innerHTML += selectOperation(currentInput[i]);
    else input.innerHTML += currentInput[i];
  }
}

function deleteChar() {
  currentInput = currentInput.slice(0, -1);
  updateInput();
}

function checkRepeat(value) {
  if (!(operations.has(value) && operations.has(currentInput.at(-1))))
    currentInput += value;
}

function inputKeyboard(event) {
  const value = event.key;
  if (digits.has(value) || operations.has(value)) {
    checkRepeat(value);
    updateInput();
  } else if (value === "Backspace") deleteChar();
}

function calculate() {
  let numbersArr = [];
  let operationsArr = [];
  for (let i = 0; i < currentInput.length; i++) {}
}

/*============== EVENTS ===============*/

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
        deleteChar();
        break;
      default:
        checkRepeat(value);
        updateInput();
        break;
    }
  });
});

document.addEventListener("keydown", inputKeyboard);
