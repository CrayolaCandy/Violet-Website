export function updateUserInfo(){
  console.log("Sending POST to /user/updateUserInfo");

  const oldUsername = localStorage.getItem("username")
  const username = document.querySelector(".newUsername").value
  const password = document.querySelector(".newPassword").value
  const email = document.querySelector(".newEmail").value
  const newIGN = document.querySelector(".newIGN").value
  const newIGNPass = document.querySelector(".newIGNPass").value
  fetch("/user/updateUserInfo", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json' 
    },
    body:JSON.stringify({
      oldUsername: oldUsername,
      username: username,
      password: password,
      email: email,
      IGN: newIGN,
      IGNPass: newIGNPass
    })
  })
  .then(res => res.json())
  .then(data =>{
    if (data.message === "Profile updated successfully"){
      console.log(data.result)
      localStorage.removeItem("username")
      localStorage.setItem("username", data.result)
      //Refresh
      location.reload();
    }
  })
}