const username = localStorage.getItem("username")
const orderOption = document.querySelector(".orderOption")
orderOption.addEventListener("click", function(){
  fetch("user/allOrders",{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      type: "All",
      username: username
    })
  })
  .then(res => res.json())
  .then(data =>{
    console.log(data)


    if(data.length > 0){
      const choiceResult = document.querySelector(".choiceResult")
      choiceResult.innerHTML = 
      `
        <div class="resultInner choiceChosen">
          
        </div>
      `
      const choiceChosen = document.querySelector(".choiceChosen")
      choiceChosen.innerHTML =
      `
        <ul class="orderList">
          <li class = "listingOrder">

          </li>
        </ul>
      `

      
      data.forEach(order => {
        const listingOrder = document.querySelector(".listingOrder")
        if (order.type === "Stat"){
          listingOrder.innerHTML +=
          `
            <div class="orderBox" data-type = "${order.type}" data-id = "${order.id}">
              <div class="type">
                <span>Mode: <span>${order.bedMode}</span></span>
              </div>
              <div class="orderContent">
                <div class="orderInfo">
                  <div>
                    <span>FinalKill: <span>${order.finalKill}</span></span><br>
                    <span>BedDestroy: <span>${order.bedDestroy}</span></span>
                  </div>
                  <div>
                    <span>Win: <span>${order.win}</span></span><br>
                    <span>WinStreak: <span>${order.winStreak}</span></span>
                  </div>
                </div>
                <button class="deleteButton">Delete</button>
              </div>
            </div>
          `
        }
        else if(order.type === "Currency"){
          listingOrder.innerHTML +=
          `
            <div class="orderBox" data-type = "${order.type}" data-id = "${order.id}">
              <div class="type">
                <span>Currency: <span>${order.currencyType}</span></span>
              </div>
              <div class="orderContent">
                <div class="orderInfo">
                  <div>
                    <span>Amount: <span>${order.amount}</span></span><br>
                  </div>
                </div>
                <button class="deleteButton">Delete</button>
              </div>
            </div>
          `
        }
        else if(order.type === "Bounty"){
          listingOrder.innerHTML +=
          `
              <div class="orderBox" data-type = "${order.type}" data-id = "${order.id}">
              <div class="type">
                <span>Target: <span>${order.target}</span></span>
              </div>
              <div class="orderContent">
                <div class="orderInfo">
                  <div>
                    <span>Amount: <span>${order.amount}</span></span><br>
                  </div>
                </div>
                <button class="deleteButton">Delete</button>
              </div>
            </div>
          `
      }
      
      
    });
    }
    else{
        const choiceResult = document.querySelector(".choiceResult")
        choiceResult.innerHTML = 
        `
          <div class="resultInner choiceChosen">
            There is no Order
          </div>
        `
      }
  })
})
