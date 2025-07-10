export function insertMessage() {
  const submitButton = document.querySelector(".submitButton");
  if(!submitButton){
    console.warn("submitButton not found — user may not be logged in or DOM not rendered.");
    return;
  }
  submitButton.addEventListener("click", async function () {  // 👈 async added here
    const userInput = document.querySelector(".userInput");
    const messageText = userInput.value.trim();

    if (!messageText) {
      console.log("Empty message, not sending.");
      return;
    }

    const messageBox = document.querySelector(".messageBox");
    const allMessages = document.querySelectorAll('.messageList');
    let newMessageID = 1;

    if (allMessages.length > 0) {
      const latestMessage = allMessages[allMessages.length - 1];
      newMessageID = parseInt(latestMessage.dataset.chatid) + 1;
    }

    const chatID = document.querySelector(".chat").dataset.titleid;
    const username = localStorage.getItem("username");

    try {
      const res = await fetch('/user/insertMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newMessageID,
          getID: chatID,
          username,
          userInput: messageText
        })
      });

      const data = await res.json();

      if (data.message === "New Message Inserted") {
        messageBox.insertAdjacentHTML('beforeend', `
          <div class="messageList" data-chatid="${newMessageID}">
            <div class="userInfo">
              <div class="userboxImage">
                <img src="/profileImage/${username.trim()}" class="userImage">
              </div>
              <div class="userboxName">
                <span class="userName">${username}</span>
              </div>
            </div>
            <div class="sentMessage">
              <div>
                <textarea readonly class="displayMessage">${messageText}</textarea>
              </div>
              <div class="editChat">
                <div class="leftSide">
                  <span class="editButton">Edit</span>
                  <span class="deleteButton">Delete</span>
                </div>
                <div class="rightSide">
                  <span>Reply</span>
                </div>
              </div>
            </div>
          </div>
        `);
        userInput.value = "";
        messageBox.scrollTop = messageBox.scrollHeight;

        // ✅ Dynamically import and apply the edit features
        const { editMessage } = await import("./editMessage.js");
        editMessage();
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  });
}
