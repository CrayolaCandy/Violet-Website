//import {settingButton} from '../settingButton.js'
import {setting} from './newsettingButton.js'
import {changeImage} from './changeProfileImage.js'
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username"); // ✅ Make sure it's defined

  fetch("/user/userInfo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const profile = document.querySelector(".profileForm");

    profile.innerHTML = `

      <div class="profile">
        
        <div class="imageBox">
          <img src="/profileImage/${data.user.username.trim()}" class="profileImage">
          <input type="file" name = 'image' class = "updateImage" style="display: none;">
        </div>
        <div class="profileInfo">
          <div class = "settingBox">
            <img src="/settingButton.png" class = "settingButton">
          </div>
          <span class="userInfo"> Welcome: 
            <span class="usernameBox">
              <span class="username">${data.user.username}</span>
            </span>
          </span><br>
          <span class="userInfo"> Email: 
            <span class="serverIPBox">
              <span class="serverIP">${data.user.email}</span>
            </span>
          </span><br>
          <span class="userInfo"> Player Name: 
            <span class="IGNBox">
              <span class="IGN">${data.user.mcname}</span>
            </span>
          </span><br>
        </div>
      </div>
    `;
    localStorage.setItem("username", data.user.username)
    localStorage.setItem("email", data.user.email)
    localStorage.setItem("mcName", data.user.mcname)
    localStorage.setItem("password", data.user.password)
    localStorage.setItem("mcPass", data.user.mcpass)
    //settingButton()
    setting()
    changeImage()
  })
  .catch(err => {
    console.error("Fetch error:", err);
  });
});


