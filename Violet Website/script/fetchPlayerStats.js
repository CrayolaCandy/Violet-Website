import { playerList } from "../dataObject/playerList";
  const interval = "Lifetime";
  const mode = "All_Modes";
export function fetchStats(){

// Helper function to fetch playerList stats
  const apiUrl = `https://stats.pika-network.net/api/profile/${playerList.name}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;
  try {
    const res = axios.get(apiUrl);
    const stats = res.data;

    // Update playerList stats
    playerList.winStreak = stats["Highest winstreak reached"]?.entries?.[0]?.value || "N/A";
    playerList.finalKill = stats["Final kills"]?.entries?.[0]?.value || "N/A";
    playerList.Wins = stats.Wins?.entries?.[0]?.value || "N/A";
    playerList.bedBreak = stats["Beds destroyed"]?.entries?.[0]?.value || "N/A";

    console.log(`Fetched stats for ${playerList.name}:`, playerList);
  } catch (error) {
    console.error(`Error fetching stats for ${playerList.name}:`, error);

    // Assign default values if an error occurs
    playerList.winStreak = "N/A";
    playerList.finalKill = "N/A";
    playerList.Wins = "N/A";
    playerList.bedBreak = "N/A";
  }
}