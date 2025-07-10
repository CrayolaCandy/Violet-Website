let head = document.querySelector(".header");

head.innerHTML += `
 <div class = sections>
          <div class = "left-section">
              <div>
                <a href="./home.html"><span class = "home">Home</span></a>
              </div>
              <div>
                <a href="./playerList.html"><span class = "player">Player</span></a>
              </div>
              <div>
                <a href="./chatTItle.html"><span class = "chatTitle">Message</span></a>
              </div>
          </div>
        <!--User Login Section-->
          <div class = "right-section">
            <span class = User>
              <div class = "login">
                <a href = "/login"><span class = "loginButton">Login
                  
                </span></a>
                |
                <a href = "/signup"> 
                <span class = "signupButton"> Signup
                  
                </span></a>

              </div>
            </span>
          </div>
        </div>
`;
