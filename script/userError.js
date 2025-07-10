import {isValidEmail} from '/emailCheck.js';

const username = document.querySelector(".usernameInput").value.trim();
const password = document.querySelector(".passwordInput").value.trim();
const email = document.querySelector(".emailInput").value.trim();
const mcName = document.querySelector(".mcnameInput").value.trim();
const mcPass = document.querySelector(".mcpassInput").value.trim();
//const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function registerCheck() {
  let valid = true;

  valid &= inputResult(".usernameInput", ".usernameResult");
  valid &= inputResult(".passwordInput", ".passwordResult");
  valid &= inputResult(".emailInput", ".emailResult", true);
  valid &= inputResult(".mcnameInput", ".mcnameResult");
  valid &= inputResult(".mcpassInput", ".mcpassResult");

  return Boolean(valid); // ensure it's true/false
}

function inputResult(inputSelector, resultSelector, isEmail = false) {
  const input = document.querySelector(inputSelector).value.trim();
  const result = document.querySelector(resultSelector);
  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!input) {
    result.textContent = "❌";
    return false;
  }

  if (isEmail && !isValidEmail(input)) {
    result.textContent = "❌";
    return false;
  }

  result.textContent = "✅";
  return true;
}