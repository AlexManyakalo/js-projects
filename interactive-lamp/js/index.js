/*============ VARIABLES ===============*/

const lamp = document.querySelector(".lamp__light");

const switcher = document.querySelector(".controls__switch-input");
let isOn = document.querySelector(".controls__switch-label");

const range = document.querySelector(".controls__range-input");
let currentNum = document.querySelector(".controls__range-label");

const color = document.querySelector(".controls__color-range");
const operating = document.querySelector(".controls__option");

let settings = {};

/*============ FUNCTIONS ===============*/

/*============ EVENTS ===============*/

switcher.addEventListener("click", () => {
  isOn.innerHTML = isOn.innerHTML === "off" ? "on" : "off";
});

range.addEventListener("input", () => {
  currentNum.innerHTML = range.value;
});

color.addEventListener("input", () => {
  lamp.style.backgroundColor = color.value;
});
