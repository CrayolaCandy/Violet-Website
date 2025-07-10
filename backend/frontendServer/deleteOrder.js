document.addEventListener("DOMContentLoaded", function () {
        
  // Attach event listener to all delete buttons using event delegation
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteButton")) {
      const orderBox = e.target.closest(".orderBox"); // find the parent box
      const orderID = orderBox.dataset.id;
      const orderType = orderBox.dataset.type;

      fetch("/user/deleteOrder", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: orderID,
          orderType: orderType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Delete response:", data);
          
          // Optionally remove the order from the page
          orderBox.remove();
          listChecker()
        })
        .catch((err) => {
          console.error("Error deleting order:", err);
        });
    }
  });
});

function listChecker() {
  const listCheck = document.querySelector(".listingOrder");
  const choiceResult = document.querySelector(".choiceResult");
  console.log("TTT")
  if (listCheck.children.length === 0) {
   choiceResult.innerHTML = 
    `
      <div class="resultInner choiceChosen">
        There is no Order
      </div>
    `
  } else {
    console.log("List still has items");
  }
}