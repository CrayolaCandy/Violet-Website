export function editMessage() {
  const messageBoxes = document.querySelectorAll(".messageList");
  messageBoxes.forEach(box => {
    const leftSide = box.querySelector(".leftSide");
    const rightSide = box.querySelector(".rightSide");
    const editButton = box.querySelector(".editButton");
    const deleteButton = box.querySelector(".deleteButton");
    const replyButton = box.querySelector(".replyButton");
    const displayMessage = box.querySelector(".displayMessage");

    if (editButton) {
      editButton.addEventListener("click", function () {
        console.log("Edit clicked");
        displayMessage.contentEditable = "true"; // ✅ Make editable
        displayMessage.focus(); // Optional: auto-focus for editing

        leftSide.innerHTML = `
          <span class="saveButton">Save</span>
          <span class="cancelButton">Cancel</span>
        `;
        rightSide.innerHTML = ``;
        editMode(box, displayMessage);
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", function () {
        leftSide.innerHTML = `
          <span>Are You Sure:</span>
          <span class="confirmDelete">Yes</span>
          <span class="cancelDelete">No</span>
        `;
        rightSide.innerHTML = ``;

        const confirmDelete = leftSide.querySelector(".confirmDelete");
        confirmDelete.addEventListener("click", function () {
          deleteMessage(box);
        });

        const cancelDelete = leftSide.querySelector(".cancelDelete");
        cancelDelete.addEventListener("click", function () {
          cancelAction(box);
        });
      });
    }

    if (replyButton) {
      replyButton.addEventListener("click", function () {
        const reply = document.querySelector(".reply");
        const replyUser = box.querySelector(".userName").innerText;
        reply.innerHTML = `Reply to ${replyUser}: ${displayMessage.innerText}`; // ✅ Use innerText
      });
    }
  });
}

function editMode(box, textInput) {
  const saveButton = box.querySelector(".saveButton");
  const cancelButton = box.querySelector(".cancelButton");
  const chat = document.querySelector(".chat");
  const originalInput = textInput.innerText; // ✅ Use innerText for div

  saveButton.addEventListener("click", function () {
    textInput.contentEditable = "false"; // ✅ Make non-editable again
    const chatID = box.dataset.chatid;
    const titleID = chat.dataset.titleid;

    updateMessage(titleID, chatID, textInput.innerText, box); // ✅ Send updated message
  });

  cancelButton.addEventListener("click", function () {
    textInput.innerText = originalInput; // ✅ Restore original text
    textInput.contentEditable = "false";
    cancelAction(box);
  });
}

function cancelAction(box) {
  const leftSide = box.querySelector(".leftSide");
  const rightSide = box.querySelector(".rightSide");

  leftSide.innerHTML = `
    <span class="editButton">Edit</span>
    <span class="deleteButton">Delete</span>
  `;
  rightSide.innerHTML = `
    <span class="replyButton">Reply</span>
  `;

  // Rebind buttons just for this box
  editMessage();
}

function deleteMessage(box) {
  const username = localStorage.getItem("username");
  const chatID = box.dataset.chatid;

  fetch("/deleteMessage", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatmessageid: chatID,
      username: username
    }),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    box.remove();
    chatCheck();
  });
}

function updateMessage(titleid, chatid, message, box) {
  const username = localStorage.getItem("username");

  fetch("/updateMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatID: titleid,
      chatmessageid: chatid,
      newMessage: message
    }),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    cancelAction(box); // restore buttons
  });
}

function chatCheck() {
  const innerForm = document.querySelector(".innerForm");
  if (!innerForm.querySelector(".messageBox")) {
    console.log("Remove this chat");
  }
}
