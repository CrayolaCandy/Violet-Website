document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector(".search-bar");
  const bountyButton = document.querySelector(".bountyButton");
  const searchResult = document.querySelector(".searchResult");

  searchBar.addEventListener("input", function () {
    const username = searchBar.value.trim();
    if (username !== "") {
      fetchPlayer(username);
    }
  });
  function fetchPlayer(username) {
    fetch(`https://stats.pika-network.net/api/profile/${encodeURIComponent(username)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Player not found");
        }
        return response.json();
      })
      .then(data => {
        //console.log(data)
        searchResult.textContent = `Player Exist`;
        //bountyButton.classList.remove("notExist")
        if(searchResult.textContent === 'Player Exist'){
          playerSkin(username)
        }

        
        
      })
      .catch(error => {
        searchResult.textContent = "Player Not Exist";
        //bountyButton.classList.add("notExist")
        //console.error("Fetch error:", error);
      });
  }
});
function playerSkin(username) {
  fetch("/player/skin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      //console.log(data.id)
      const playerskinID = data.id;
      const skin = document.querySelector(".skin")
      if(playerskinID){
        const skinUrl = `https://crafatar.com/renders/body/${playerskinID}?scale=10`;
        skin.innerHTML =
          `
            <img src="${skinUrl}" class = "searchSkin">
          `
      }
      else{
        skin.innerHTML =
          `
            <img src="/Default.png" class = "searchSkin">
          `
      }
      

    })
    .catch(err => {
      return
      //console.error(err);
    });
}


