export function orderPlaced(message){
  const orderMessage = document.querySelector(".orderMessage")
  orderMessage.textContent = message
  orderMessage.classList.add("fade-message");
  orderMessage.classList.remove("hide");

  setTimeout(() =>{
    orderMessage.classList.add("hide");
    setTimeout(() =>{
      orderMessage.textContent = "";
      orderMessage.classList.remove("fade-message", "hide")
    }, 500)
  }, 3000)
}