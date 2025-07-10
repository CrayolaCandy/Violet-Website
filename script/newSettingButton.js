import { updateCheck } from "./updateCheck.js";
import { updateUserInfo } from "../updateUserInfo.js";

export function setting(){
  const settingButton = document.querySelector(".settingButton")
    settingButton.addEventListener("click", function(){
      const profileInfo = document.querySelector(".profileInfo")
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
      const profileConfirm = document.querySelector(".profileConfirm")
      profileConfirm.addEventListener("click", function(){
        if(!updateCheck()){
          return
        };
        updateUserInfo()
      })
})}