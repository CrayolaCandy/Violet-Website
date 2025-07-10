document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM fully loaded");
  const loginButton = document.querySelector(".LoginButton");

  if (!loginButton) {
    console.error("Login button not found in DOM");
    return;
  }


  loginButton.addEventListener("click", function(){
    const username = document.querySelector(".usernameLogin").value;
    const password = document.querySelector(".passwordLogin").value;
    fetch("/user/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data.username)
      if(data.message === "Success"){
        localStorage.setItem("username", data.username)
        /*
        console.log(data.username)

        const user = document.querySelector(".User")
        //user.innerHTML = data.username
        localStorage.setItem('username', data.username);
        user.innerHTML = 
        ` 
          <div class = "Form">
            <span class = "userList">${data.username}
              <div class = "formList">
                
                <a href = "/profile" class = "profileLink"><p class = "orderLink">Order</p></a>
                <p class = "logout_button">Logout</p>
              </div>
            </span>
          </div>
        `
        */
        window.location.href = "/home";
        logout()
        User()
      }
      else{
        const respond = document.querySelector(".Result");
        respond.innerHTML = data.message
        console.log(data.message)
      }
    })
    .catch(err => {
      console.log(err);
    })
  })
})