import { playerList } from "../dataObject/player.js";

document.addEventListener("DOMContentLoaded", async function () {
  const interval = "Lifetime";
  const mode = "All_Modes";

  async function fetchPlayerStats(player) {
    const apiUrl = `https://stats.pika-network.net/api/profile/${player.name}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;
    try {
      const res = await axios.get(apiUrl);
      const stats = res.data;

      player.winStreak = stats["Highest winstreak reached"]?.entries?.[0]?.value || "N/A";
      player.finalKill = stats["Final kills"]?.entries?.[0]?.value || "N/A";
      player.Wins = stats.Wins?.entries?.[0]?.value || "N/A";
      player.bedBreak = stats["Beds destroyed"]?.entries?.[0]?.value || "N/A";

      console.log(`Fetched stats for ${player.name}:`, player);
    } catch (error) {
      console.error(`Error fetching stats for ${player.name}:`, error);

      player.winStreak = "N/A";
      player.finalKill = "N/A";
      player.Wins = "N/A";
      player.bedBreak = "N/A";
    }
  }

  // Helper function to add a delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Sequentially fetch stats for each player with a delay
  async function fetchAllPlayerStats() {
    for (const player of playerList) {
      await fetchPlayerStats(player);
      await delay(1000); // Add a 1-second delay between requests
    }
  }

  function renderPlayerData() {
    const container = document.querySelector(".js-player-box"); 
    let playerHTML = "";

    playerList.forEach((player) => {
      const playerImage = player.image || "../skins/SkinMC default_.png";

      playerHTML += `
        <div class="player-box">
          <div>
            <img class="player-image" src="${playerImage}" alt="Player Skin">
          </div>
          <div class="player-info">
            <p class="player-name">${player.name}</p>
            <div class="stat">
              <p>Kills: <span class = "stat-info">${player.finalKill}</span></p>
              <p>Bed Broken: <span class = "stat-info">${player.bedBreak}</span></p>
              <p>WinStreak: <span class = "stat-info">${player.winStreak}</span></p>
              <p>Wins: <span class = "stat-info">${player.Wins}</span></p>
            </div>
              <div class = "addToList">
                <button class="addToListButton" data-player="${player.name}">Add to Cart</button>

              </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = playerHTML;
  }

  // Fetch stats and then render the data
  await fetchAllPlayerStats();
  const window  = document.querySelector(".page2");
  const waiting = document.querySelector(".page");
  window.classList.remove("window");
  waiting.classList.add("screen");
  console.log("All API requests are completed. Player stats:", playerList);

  renderPlayerData(); // Call this function to display the data on the page
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("addToListButton")) {
    const playerName = event.target.getAttribute("data-player");
    console.log(`Added ${playerName} to cart`);
  }
});
