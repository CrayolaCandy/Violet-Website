function infoChange(change){
  if(change === "username"){
    const informationChanging = document.querySelector(".username")
    const oldInformation = informationChanging.textContent;
    informationChanging.setAttribute("data-old", oldInformation)
    informationChanging.innerHTML = 
    `
      <span class = "changingUsername">
        <input type = "text" placeholder = "Username" class = "newUsername"><button class = "confirmUsername" onclick = "confirmChange('newUsername')">Confirm</button>
      </span>
    `
  }
  else if (change === "serverIP"){
    const informationChanging = document.querySelector(".serverIP")
    const oldInformation = informationChanging.textContent;
    informationChanging.setAttribute("data-old", oldInformation)
    informationChanging.innerHTML = 
    `
      <span class = "changingServer">
        <input type = "text" placeholder = "Server IP" class = "newServer"><button class = "confirmServer" onclick = "confirmChange('newServer')">Confirm</button>
      </span>
    `
  }
  else if (change === "IGN"){
    const informationChanging = document.querySelector(".IGN")
    const oldInformation = informationChanging.textContent;
    informationChanging.setAttribute("data-old", oldInformation)
    
    informationChanging.innerHTML = 
    `
      <span class = "changingIGN">
        <input type = "text" placeholder = "Server IP" class = "newIGN">
        <button class = "confirmIGN" onclick = "confirmChange('newIGN')">Confirm</button>
      </span>
    `
  }
}
function confirmChange(newInfo){
  if(newInfo === "newUsername"){
    const newUsername = document.querySelector(".newUsername")
    const oldUsername = document.querySelector(".username")
      previousUsername = oldUsername.getAttribute("data-old")
    if(newUsername.value.trim()){
      oldUsername.textContent = newUsername.value
    }
    else{
      oldUsername.textContent = previousUsername;
    }
    console.log("Test")
  }
  else if(newInfo === "newServer"){
    const newServer = document.querySelector(".newServer")
    const oldServer = document.querySelector(".serverIP")
      previousServer = oldServer.getAttribute("data-old")
    if(newServer.value.trim()){
      oldServer.textContent = newServer.value
    }
    else{
      oldServer.textContent = previousServer;
    }
    console.log("Test")
  }
  else if(newInfo === "newIGN"){
    const newIGN = document.querySelector(".newIGN")
    const oldIGN = document.querySelector(".IGN")
      previousIGN = oldIGN.getAttribute("data-old")
    if(newIGN.value.trim()){
      oldIGN.textContent = newIGN.value
    }
    else{
      oldIGN.textContent = previousIGN;
    }
    
    console.log("Test")
  }
}