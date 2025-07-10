document.addEventListener('DOMContentLoaded', () => {
  fetch('/user/checkLog',{
    method: "GET",
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        console.log('User is logged in:', data.user);
        const user = document.querySelector(".User")
        //user.innerHTML = data.
        //localStorage.getItem('username');
        console.log(data.user.username)
        user.innerHTML = 
        ` 
          <div class = "Form">
           
            <span class = "userList"  data-username = "${data.user.username}"><img src = "/profileImage/${data.user.username}" class = "headerImage">
              <div class = "formList">
                <a href = "/profile" class = "profileLink"><p class = "orderLink">Order</p></a>
                <p class = "logout_button">Logout</p>
                  
              </div>
            </span>
          </div>
        `
        logout()
        User()

        // Show/hide UI accordingly
      } else {
        console.log('User not logged in');
        // Redirect or show login button
      }
    });
});
