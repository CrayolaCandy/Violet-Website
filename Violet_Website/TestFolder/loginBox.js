  const showButton = document.querySelector(".showButton");
  const logBox = document.querySelector(".logBox");
  const logMessage = document.querySelector(".logMessage");

  showButton.addEventListener("click", function () {  
    logMessage.innerHTML = 
    `
      <span>You Need to <a href = "login.html" class = "logLink">Login</a> in order to Place Order</span>
    `;
    logBox.classList.add("logBox2"); // ✅ This should add styling
    
    
  });
  const secondButton = document.querySelector(".secondButton")
  
  document.addEventListener("click", (e) =>{
      if(!logBox.contains(e.target) && !showButton.contains(e.target)){
        logBox.classList.remove("logBox2")

        logMessage.textContent = 
        `

        `;
      }
      
    })


