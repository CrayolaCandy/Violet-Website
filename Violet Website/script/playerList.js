import { playerList } from "../dataObject/player.js";

document.addEventListener("DOMContentLoaded", async function () {
  const interval = "Lifetime";
  const mode = "All_Modes";

  // Helper function to fetch player stats
  async function fetchPlayerStats(player) {
    const apiUrl = `https://stats.pika-network.net/api/profile/${player.name}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;
    try {
      const res = await axios.get(apiUrl);
      const stats = res.data;

      // Update player stats
      player.winStreak = stats["Highest winstreak reached"]?.entries?.[0]?.value || "N/A";
      player.finalKill = stats["Final kills"]?.entries?.[0]?.value || "N/A";
      player.Wins = stats.Wins?.entries?.[0]?.value || "N/A";
      player.bedBreak = stats["Beds destroyed"]?.entries?.[0]?.value || "N/A";

      console.log(`Fetched stats for ${player.name}:`, player);
    } catch (error) {
      console.error(`Error fetching stats for ${player.name}:`, error);

      // Assign default values if an error occurs
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

  // Render player data into the DOM
  function renderPlayerData() {
    const container = document.querySelector(".js-player-box"); // Ensure this container exists in your HTML
    let playerHTML = "";

    playerList.forEach((player) => {
      const playerImage = player.image || "./skins/SkinMC default_.png";

      playerHTML += `
        <div class="player-box">
          <div>
            <img class="player-image" src="${playerImage}" alt="Player Skin">
          </div>
          <div class="player-info">
            <p class="player-name">${player.name}</p>
            <div class="stat">
              <p>Kills: <span>${player.finalKill}</span></p>
              <p>Bed Broken: <span>${player.bedBreak}</span></p>
              <p>WinStreak: <span>${player.winStreak}</span></p>
              <p>Wins: <span>${player.Wins}</span></p>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = playerHTML;
  }

  // Fetch stats and then render the data
  await fetchAllPlayerStats();
  console.log("All API requests are completed. Player stats:", playerList);

  renderPlayerData(); // Call this function to display the data on the page
});
