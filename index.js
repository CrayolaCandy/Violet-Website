// Add an event listener for when the search button is clicked
document.getElementById("searchBtn").addEventListener("click", () => {
  const playerIGN = document.getElementById("playerIGN").value.trim();
  const interval = document.getElementById("interval").value.trim();
  const mode = document.getElementById("mode").value.trim();

  if (!playerIGN) {
      document.getElementById("statsResult").innerText = "Please enter a valid player name.";
      return;
  }

  // Construct the API URL
  const apiUrl = `https://stats.pika-network.net/api/profile/${playerIGN}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;

  // Fetch the player stats using Axios
  axios.get(apiUrl)
      .then(res => {
          console.log("Full API Response:", res.data);  // Log the full API response to check the structure
          const stats = res.data;

          // Check if stats are available and display them
          if (stats) {
              document.getElementById("statsResult").innerHTML = `
                  <h2>Stats for ${playerIGN}</h2>
                  <p><strong>Deaths Entry Value:</strong> ${stats.Deaths?.entries?.length > 0 ? stats.Deaths.entries[0].value : "N/A"}</p>
                  <p><strong>Final Kills Entry Value:</strong> ${stats["Final kills"]?.entries?.length > 0 ? stats["Final kills"].entries[0].value : "N/A"}</p>
                  <p><strong>Wins Entry Value:</strong> ${stats.Wins?.entries?.length > 0 ? stats.Wins.entries[0].value : "N/A"}</p>
                  <p><strong>Beds Destroyed Value:</strong> ${stats["Beds destroyed"]?.entries?.length > 0 ? stats["Beds destroyed"].entries[0].value : "N/A"}</p>
              `;
          } else {
              document.getElementById("statsResult").innerText = "Stats not available for this player.";
          }
      })
      .catch(err => {
          console.log(err);
          document.getElementById("statsResult").innerText = "Failed to fetch stats. Please try again later.";
      });
});