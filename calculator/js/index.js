/*============== GLOBAL VARIABLES ===============*/

// input/output of results
let input = document.querySelector(".calc__head-input");
let output = document.querySelector(".calc__head-num");

// all buttons
const numbersList = document.querySelector(".calc__list");
const numbers = numbersList.querySelectorAll(".btn");

// variables for calculations
let result = 0;
let currentInput = "";
const operations = new Set(["×", "÷", "%", "+", "-"]);
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);

/*============== FUNCTIONS ===============*/

function selectOperation(op) {
  return `<span class="calc__head-operation"> ${op} </span>`;
}

function updateInput() {
  input.innerHTML = "";
  for (const char of currentInput) {
    if (operations.has(char)) input.innerHTML += selectOperation(char);
    else input.innerHTML += char;
  }
}

function deleteChar() {
  currentInput = currentInput.slice(0, -1);
  updateInput();
}

function checkOperation(value) {
  if (
    !operations.has(value) ||
    (!operations.has(currentInput.at(-1)) && currentInput) ||
    (value === "-" && !currentInput)
  )
    currentInput += value;
}

function inputKeyboard(event) {
  const value = event.key;
  if (digits.has(value) || operations.has(value)) {
    checkOperation(value);
    updateInput();
  } else if (value === "Backspace") deleteChar();
}

function performOperation(a, b, operation) {
  switch (operation) {
    case "×":
      return a * b;
    case "÷":
      return a / b;
    case "%":
      return a * (b / 100);
    case "-":
      return a - b;
    case "+":
      return a + b;
  }
}

function sortOperations(tierOperations, numbers, operations) {
  for (let i = 0; i < operations.length; i++) {
    if (tierOperations.has(operations[i])) {
      const result = performOperation(
        numbers[i],
        numbers[i + 1],
        operations[i]
      );

      numbers.splice(i, 2, result);
      operations.splice(i, 1);
      i--;
    }
  }
  return [numbers, operations];
}

function calculate() {
  if (operations.has(currentInput.at(-1))) return;

  let operationsArr = [];
  for (const char of currentInput)
    if (operations.has(char)) operationsArr.push(char);

  const numbersArr = currentInput.split(/[\-+×÷%]/).map(Number);

  const highOperations = new Set(["×", "÷", "%"]);
  const lowOperations = new Set(["+", "-"]);

  console.log(numbersArr);
  console.log(operationsArr);
  
  const highResult = sortOperations(highOperations, numbersArr, operationsArr);
  const result = sortOperations(lowOperations, highResult[0], highResult[1]);

  return result[0][0];
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
        output.textContent = calculate();
        result = 0;
        break;
      case "⇐":
        deleteChar();
        break;
      default:
        checkOperation(value);
        updateInput();
        break;
    }
  });
});

document.addEventListener("keydown", inputKeyboard);
