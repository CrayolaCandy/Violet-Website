const interval = "Lifetime";
const mode = "All_Modes"

export const winStreak = "";
export const finalKill = "";
export const Wins = "";
export const bedBreak = "";

const apiUrl = `https://stats.pika-network.net/api/profile/${playerIGN}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;

  // Fetch the player stats using Axios
  axios.get(apiUrl)
      .then(res => {
          console.log("Full API Response:", res.data);  // Log the full API response to check the structure
          const stats = res.data;

          // Check if stats are available and display them
          if (stats) {
                  winStreak = stats["Highest winstreak reached"]?.entries?.length > 0 ? stats["Highest winstreak reached"].entries[0].value : "N/A";
                  finalKill = stats["Final kills"]?.entries?.length > 0 ? stats["Final kills"].entries[0].value : "N/A";
                  Wins = stats.Wins?.entries?.length > 0 ? stats.Wins.entries[0].value : "N/A";
                  bedBreak = stats["Beds destroyed"]?.entries?.length > 0 ? stats["Beds destroyed"].entries[0].value : "N/A";
          } 
      })
      .catch(err => {
      });