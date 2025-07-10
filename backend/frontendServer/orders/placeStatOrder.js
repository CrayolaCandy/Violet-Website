import {checkLogin, checkMode} from '/checkError.js'
import {orderPlaced} from '/orderPlaced.js'

document.addEventListener("DOMContentLoaded", function(){
  const statButton = document.querySelector(".statButton")
  statButton.addEventListener("click", function(){
    if(!checkLogin()){
      return;
    }
    if(!checkMode()){
      return;
    }
    insertStatOrder()
  })
})
function insertStatOrder(){
    const username = localStorage.getItem("username")
    const mode = document.querySelector(".clicked")
    const bedDestroy = document.getElementById("bedDestroy")
    const finalKill = document.getElementById("finalKill")
    const winStreak = document.getElementById("winStreak")
    const wins = document.getElementById("wins")
  fetch('/user/statOrder', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
        username: username,
        bedMode: mode.value,
        bedDestroy: bedDestroy.value,
        finalKill: finalKill.value,
        winStreak: winStreak.value,
        win: wins.value
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