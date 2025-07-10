//import { locateChat } from "./chatMessage.js";
document.addEventListener("DOMContentLoaded", function() {
  fetch('/users/chatList', {
    method: "GET",
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    const chatBox = document.querySelector(".chatList");
    chatBox.innerHTML = `<ul class="chatHeader"></ul>`;
    
    const chatHeader = document.querySelector(".chatHeader");
    
    data.forEach(chatTitle => {
      if (chatTitle.chatType === "Conversation") {
        chatHeader.innerHTML += `
          <li class="chatBox" data-chatTitle = "${chatTitle.id}">
            <a  href = "/chat/${chatTitle.id}"  class = "chatID">
              <span>${chatTitle.chatname}</span>
            </a>
          </li>
        `;
      }
    });
    /*
    chatHeader.addEventListener("click", function(e) {
     
      const chatItem = e.target.closest(".chatBox");
      if (!chatItem) return; 

      const chatID = chatItem.dataset.chatTitle;
      console.log("Selected chat ID:", chatID);

      locateChat(chatID);
    });
    */
  
  });
});