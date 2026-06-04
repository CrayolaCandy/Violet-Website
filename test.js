const axios = require('axios');

const playerIGN = 'XxSweetCandyxX';
const mode = "solo";
const interval = 'lifetime';
const apiUrl = `https://stats.pika-network.net/api/profile/${playerIGN}/leaderboard?type=bedwars&interval=${interval}&mode=${mode}`;

axios.get(apiUrl)
  .then(response => {
    // Extract the relevant data for 'Deaths' stat
    const deathsTotal = response.data.Deaths?.metadata?.total; // Get the total deaths
    const deathsEntries = response.data.Deaths?.entries; // Get the entries array

    console.log(`Deaths for ${playerIGN}:`);
    console.log(`Total Deaths: ${deathsTotal}`);
    if (deathsEntries && deathsEntries.length > 0) {
      console.log('Entry Value:', deathsEntries[0].value);  // Access the 'value' from the first entry
    } else {
      console.log('No entries available for Deaths');
    }

    // Extract and log Kills data
    const killsTotal = response.data.Kills?.metadata?.total;
    const killsEntries = response.data.Kills?.entries;
    console.log(`Kills: Total = ${killsTotal}`);
    if (killsEntries && killsEntries.length > 0) {
      console.log('Kills Entry Value:', killsEntries[0].value);  // Access the 'value' from the first entry
    } else {
      console.log('No entries available for Kills');
    }

    // You can repeat this for other stats (Wins, Beds Destroyed, etc.) similarly
  })
  .catch(error => {
    console.error('Error fetching stats:', error.message);
  });
