import {checkLogin, checkBounty} from '/checkError.js'
import {orderPlaced} from '/orderPlaced.js'
document.addEventListener("DOMContentLoaded", function(){
  const bountyButton = document.querySelector(".bountyButton")
  
  bountyButton.addEventListener("click", function(){

    if(!checkLogin()){
      return;
    }
    if(!checkBounty()){
      return;
    }
    insertBountyOrder()
  })
})
  function insertBountyOrder(){
    const username = localStorage.getItem("username")
    const target = document.querySelector(".search-bar") 
    const amount = document.querySelector(".bountyAmount")
    fetch('/user/bountyOrder', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
          username: username,
          target: target.value,
          amount: amount.value
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

