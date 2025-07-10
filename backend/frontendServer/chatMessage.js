import { editMessage } from "../editMessage.js";
import { insertMessage } from "./insertMessage.js";
document.addEventListener("DOMContentLoaded", function(){
  const url = window.location.pathname; // get path like "/chat/12345"
  const segments = url.split('/');
  const chatID = segments[segments.length - 1];
  console.log(chatID);
  if (/^\d+$/.test(chatID)) {
      fetch(`/users/chatMessages/${chatID}`, {
    method: "GET",
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    //Update Messages
    const messageForm = document.querySelector(".messageBox");
    
    data.messages.forEach(chat => {
      messageForm.innerHTML += 
      `
        <div class = "messageList" data-chatid = "${chat.chatmessageid}">
          <div class = "userInfo">
            <div class = "userboxImage">
              <img src = "/chatImage/${chat.username.trim()}" class = "userImage">
            </div>
            <div class = "userboxName">
              <span class = "userName">${chat.username}</span>
            </div>
          </div>
          
          <div class = "sentMessage">
            <div class = "messageSection">
              <div contenteditable = "false" class = "message ">
                <span class = "displayMessage">${chat.message}</span>
              </div>
              <div contenteditable = "false" class = "image">
                <span></span>
              </div>
           
              <div class = "editChat">
                <div class = "leftSide">
                  <span class = "editButton">Edit</span>
                  <span class = "deleteButton">Delete</span>
                </div>
                <div class = "rightSide">
                  <span class = "replyButton">Reply</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      `;
    });
    console.log(data.title)
    //Update Title 
    const title = document.querySelector(".title");
    title.innerHTML = 
    `
      <textarea readonly class = "chat" 
          data-titleID = "${data.title.id}" data-titleType = "${data.title.chatType.trim()}">${data.title.chatname}
      </textarea>
    `
    checkLogin()
    insertMessage()
    editMessage()
  })
  .catch(err => {
    console.error('Fetch error:', err);
  });
  }
  else{
     window.location.href = `/${chatID}`;
  }

});
function checkLogin() {
  const user = document.querySelector(".User");
  const userSection = document.querySelector(".userSection");
  const username = localStorage.getItem("username");

  if (!user.querySelector(".userList")) {
    userSection.innerHTML = `
      <div class="loginNotice">
        <span>Need to Login In order To send Message</span>
      </div>
    `;

    document.querySelectorAll(".editChat").forEach(editChat => {
      editChat.style.display = "none";
    });
  } else {
    userSection.innerHTML = `
      <div class="userInfo">
        <div class="userboxImage">
          <img src="/chatImage/${username}" class="userImage">
        </div>
        <div class="userboxName">
          <span class="userName">${username}</span>
        </div>
      </div>
      
      <div class="inputBox">
        <textarea class="userInput"></textarea>
        <div class = "replyBox">
          <span class = "reply">This is a message2</span>
        </div>
        <div class="submitBox">
          <button class="submitButton">Submit</button>
        </div>
      </div>
    `;

    document.querySelectorAll(".userName").forEach(nameSpan => {
      if (username !== nameSpan.textContent.trim()) {
        const leftSide = nameSpan.closest(".messageList")?.querySelector(".leftSide");
        const editButton = leftSide.querySelector(".editButton")
        const deleteButton = leftSide.querySelector(".deleteButton")
        if (leftSide) {
          //leftSide.style.display = "none";
          editButton.style.display = "none"
          deleteButton.style.display = "none"
        }
      }
    });
  }
}
