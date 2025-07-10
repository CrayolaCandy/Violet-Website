import { isValidEmail } from '../emailCheck.js';
import { updateUserInfo } from '../updateUserInfo.js'; // assuming you have this

export function settingButton() {
  const settingBtn = document.querySelector(".settingButton");
  if (!settingBtn) return;

  settingBtn.addEventListener("click", () => {
    const profileInfo = document.querySelector(".profileInfo");
    const username = localStorage.getItem('username') || "";
    const email = localStorage.getItem('email') || "";
    const mcName = localStorage.getItem('mcName') || "";
    const password = localStorage.getItem("password") || "";
    const mcPass = localStorage.getItem("mcPass") || "";

    profileInfo.innerHTML = `
      <span class="settingResult">Username or Email Already Exist</span>
      <div class="profileFields">
        <span class="userInfo">Username:
          <input type="text" value="${username}" class="newUsername">
        </span><br>
        <span class="userInfo">Password:
          <input type="text" value="${password}" class="newPassword">
        </span><br>
        <span class="userInfo">Email:
          <input type="text" value="${email}" class="newEmail">
        </span><br>
        <span class="userInfo">Player Name:
          <input type="text" value="${mcName}" class="newIGN">
        </span><br>
        <span class="userInfo">Player Password:
          <input type="text" value="${mcPass}" class="newIGNPass">
        </span><br>
        <button class="profileConfirm">Confirm</button>
      </div>
    `;

    // Attach event listener to the new confirm button
    document.querySelector(".profileConfirm")?.addEventListener("click", changeCheck);
  });
}

function changeCheck() {
  const username = document.querySelector(".newUsername")?.value.trim();
  const password = document.querySelector(".newPassword")?.value.trim();
  const email = document.querySelector(".newEmail")?.value.trim();
  const mcName = document.querySelector(".newIGN")?.value.trim();
  const mcPass = document.querySelector(".newIGNPass")?.value.trim();

  if (!username || !password || !email || !mcName || !mcPass) {
    console.log("Cannot be empty");
    return;
  }

  if (!isValidEmail(email)) {
    console.log("Invalid email");
    return;
  }

  // Optional: Save to localStorage again
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("email", email);
  localStorage.setItem("mcName", mcName);
  localStorage.setItem("mcPass", mcPass);

  // Send to backend (replace this with your actual function or fetch)
  updateUserInfo();
}
