fetch('./data/player.json') // Fetch the JSON file
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the JSON file');
    }
    return response.json();
  })
  .then(async (players) => { // Assuming 'players' is an array
    const interval = "Lifetime";
    const mode = "All_Modes";
    const delayTime = 1000; // Delay time in milliseconds (1 second)

    // Loop through each player to get their stats from the API
    for (let player of players) {
      const apiUrl = `https://stats.pika-network.net/api/profile/${player.name}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;
      
      try {
        const res = await axios.get(apiUrl); // Await the response
        const stats = res.data;

        // Update player stats with the fetched data
        player.winStreak = stats["Highest winstreak reached"]?.entries?.[0]?.value || "N/A";
        player.finalKill = stats["Final kills"]?.entries?.[0]?.value || "N/A";
        player.Wins = stats.Wins?.entries?.[0]?.value || "N/A";
        player.bedBreak = stats["Beds destroyed"]?.entries?.[0]?.value || "N/A";

        console.log(player); // Optionally log each updated player
        
        // Add a delay before the next fetch
        await delay(delayTime);
        if(players[players.length - 1]){
          window.location.href = "PlayerList.html"
        }
      } catch (error) {
        console.error(`Error fetching stats for ${player.name}:`, error);
      }
    }
  })
  .catch(error => console.error('Error:', error));
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }