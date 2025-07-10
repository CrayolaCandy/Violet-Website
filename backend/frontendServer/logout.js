function logout(){
  const logoutButton = document.querySelector(".logout_button");

  logoutButton.addEventListener("click", function(){
    fetch('/user/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      const user = document.querySelector(".User");

      user.innerHTML = 
      `
        <div class = "login">
                <span class = "loginButton">Login
                  <div class = "loginForm">
                    <input type="text" class = "usernameLogin" placeholder="Username">
                    <input type="text" class = "passwordLogin" placeholder="Password">

                    <div>
                      <span class = "respond"></span>
                      <div>
                        <button class = "login_button">Login</button>
                      </div>
                    </div>

                  </div>
                </span>
                |
                <span class = "signupButton"> Signup
                <div class = "signupForm">
                    <input type="text" class = "usernameSignup" placeholder="Username">
                    <input type="text" class = "passwordSignup" placeholder="Password">

                    <div>
                      <span class = "respond"></span>
                      <div>
                        <button class = "signup_button">Signup</button>
                      </div>
                      
                    </div>

                  </div>
                </span>

              </div>
      `
      localStorage.clear()
      location.reload();
      console.log(data.message);
      // Redirect to login or update UI
    });

  })
}
  