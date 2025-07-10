import { isValidEmail } from '../emailCheck.js';
export function updateCheck(){
  const username = document.querySelector(".newUsername")?.value.trim();
  const password = document.querySelector(".newPassword")?.value.trim();
  const email = document.querySelector(".newEmail")?.value.trim();
  const mcName = document.querySelector(".newIGN")?.value.trim();
  const mcPass = document.querySelector(".newIGNPass")?.value.trim();

  if (!username || !password || !email || !mcName || !mcPass) {
    console.log("Cannot be empty");
    return false;
  }

  if (!isValidEmail(email)) {
    console.log("Invalid email");
    return false;
  }
  return true;
}