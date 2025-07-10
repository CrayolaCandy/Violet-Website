import {registerCheck} from '/userError.js'

document.addEventListener("DOMContentLoaded", function(){
  const signupButton = document.querySelector(".signup_button");

  signupButton.addEventListener("click", function(){
    const username = document.querySelector(".usernameInput").value;
    const password = document.querySelector(".passwordInput").value;
    const email = document.querySelector(".emailInput").value
    const mcName = document.querySelector(".mcnameInput").value
    const mcPass = document.querySelector(".mcpassInput").value
    
    if(!registerCheck()){
      return
    }

    fetch("/user/signup",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email:email,
        mcName:mcName,
        mcPass: mcPass
      })
    })
    .then(res=> res.json())
    .then(data => {
      if(data.message !== "User registered successfully"){
        console.log(data.message)
        window.location.href = "/login";
      }
      else{
        console.log(data.message)
      }
    })
    .catch(err => {
      console.log(err);
    })
  })
})

