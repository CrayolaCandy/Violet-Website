const username = localStorage.getItem('username')
document.addEventListener("DOMContentLoaded", function(){
  const profile = document.querySelector(".profileForm");
  //console.log("Loaded username from localStorage:", username);

  profile.innerHTML =
  `
    <div class="profile">
      <div class="imageBox">
        <img src="/CrayolaCandyProfileImage.jpg" class="profileImage" />
      </div>
      <div class="profileInfo">
        <span class="userInfo"> Welcome: 
          <span class="usernameBox">
            <span class = "username">${username}</span></span>
            <img src="/settingButton.png" class = "settingButton usernameChange" onclick = "infoChange('username')">
          </span><br>
        <span class="userInfo"> Minecraft Server: 
          <span class="serverIPBox">
            <span class = "serverIP">Pika-Network</span></span>
            <img src="/settingButton.png" class = "settingButton serverChange" onclick = "infoChange('serverIP')">
          </span><br>
        <span class="userInfo"> Player Name: 
          <span class="IGNBox"> 
            <span class = "IGN">XxSweetCandyxX</span></span>
            <img src="/settingButton.png" class = "settingButton ignChange" onclick = "infoChange('IGN')">
          </span><br>
      </div>
    </div>
  `
})