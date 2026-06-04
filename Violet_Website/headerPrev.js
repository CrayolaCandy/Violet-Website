let head = document.querySelector(".header");

head.innerHTML += `
 <div class = sections>
          <div class = "left-section">
              <div>
                <a href="./home.html"><button class = "home">Home</button></a>
              </div>
              <div>
                <a href="./playerList.html"><button class = "player">Player</button></a>
              </div>
              <div class = 'creator'>Creator
                
              </div>
          </div>
        <!--User Login Section-->
          <div class = "right-section">
            <span class = User>
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
            </span>
          </div>
        </div>
`;
