


const modeList = ["Solo", "Duo", "Trio", "Quad"]; // Use an array for modeList

let modeHTML = ""; // Initialize an empty string for HTML

// Loop through each mode and generate HTML
modeList.forEach((mode) => {
  modeHTML += `
    <div class="box">
      <span class="box-mode">${mode}</span>
      <div class="nested-grid">
        <div class="nested-box">
          <p>Win: <span class="amount">25</span></p>
          <input type="range" min="0" max="50" value="25" id="inputAmount">
        </div>
        <div class="nested-box">
          <p>WinStreak: <span id ="amount">25</span></p>
          <input type="range" min="0" max="50" value="25" id ="inputAmount">
        </div>
        <div class="nested-box">
          <p>Bed Destroy: <span id="amount">25</span></p>
          <input type="range" min="0" max="50" value="25" id="inputAmount">
        </div>
        <div class="nested-box">
          <p>Final Kill: <span id="amount">25</span></p>
          <input type="range" min="0" max="50" value="25" id="inputAmount">
        </div>
      </div>
      <div class="confirm">
        <button class="confirm-button">Confirm</button>
        <p class="check"><input type="checkbox">Check to Confirm</p>
      </div>
    </div>
  `;
});

// Insert the generated HTML into the page
document.querySelector(".grid").innerHTML = modeHTML;
// Get references to the slider and the span that will show the value
const slider = document.getElementById("inputAmount");
const sliderValue = document.getElementById("amount");

// Update the span when the slider value changes
slider.addEventListener("input", function() {
    sliderValue.textContent = slider.value;
});