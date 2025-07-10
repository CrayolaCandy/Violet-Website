const statButton = document.querySelector(".statButton")
const currencyButton = document.querySelector(".currencyButton")
const bountyButton = document.querySelector(".bountyButton")
const errorBox = document.querySelector(".errorBox")
const errorMessage = document.querySelector(".errorMessage")

export function checkLogin(){
  const loginCheck = localStorage.getItem('username')
  if(!loginCheck){
    errorMessage.innerHTML = 
    `<span>You Need to <a href = "login.html" class = "logLink">Login</a> in order to Place Order</span>`
    //throw new Error("Need to Login To Place Order")
    errorBox.classList.add("errorBox2");
    return false;
  }
  return true;
}
export function checkMode(){
  const mode = document.querySelector(".clicked")
  if(!mode){
    errorMessage.innerHTML = 
    `<span>No Mode Selected</span>`
    //throw new Error("Need to Login To Place Order")
    errorBox.classList.add("errorBox2");
    //throw new Error("No Mode Selected")
    return false;
  }
  return true;
}
export function checkCurrency(){
  const currency = document.querySelector(".xpCoinclicked")
  if(!currency){
    errorMessage.innerHTML = 
    `<span>No Currency Selected</span>`
    //throw new Error("Need to Login To Place Order")
    errorBox.classList.add("errorBox2");
    //throw new Error("No Mode Selected")
    return false;
  }
  return true;
}
export function checkBounty() {
  const searchResult = document.querySelector(".searchResult");

  if (!searchResult || searchResult.textContent.trim() !== "Player Exist") {
    errorMessage.innerHTML = `<span>Invalid Input</span>`;
    errorBox.classList.add("errorBox2");
    return false;
  }
  return true;
}
document.addEventListener("click", (e) =>{
if (
  !errorBox.contains(e.target) &&
  !statButton.contains(e.target) &&
  !currencyButton.contains(e.target) &&
  !bountyButton.contains(e.target)
) {
  errorBox.classList.remove("errorBox2");
  errorMessage.textContent = " ";
}

})

