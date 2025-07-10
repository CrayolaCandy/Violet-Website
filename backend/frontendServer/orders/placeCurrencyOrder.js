import {checkLogin, checkCurrency} from '/checkError.js'
import {orderPlaced} from '/orderPlaced.js'

document.addEventListener("DOMContentLoaded", function(){
  const currencyButton = document.querySelector(".currencyButton")
  currencyButton.addEventListener("click", function(){
    if(!checkLogin()){
      return;
    }
    if(!checkCurrency()){
      return;
    }
    insertCurrencyOrder()
  })
})
function insertCurrencyOrder(){
    const username = localStorage.getItem("username")
    const currencyType = document.querySelector(".xpCoinclicked")
    const currency = document.querySelector(".currency")
    console.log(username + currencyType.dataset.value + currency.value)
  fetch('/user/currencyOrder', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
        username: username,
        currency: currencyType.dataset.value,
        amount: currency.value,
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data.message === "Order Placed"){
      orderPlaced("Order Placed Succesfully")
    }
  })
  .catch(err =>{
    console.log(err)
  })

}
