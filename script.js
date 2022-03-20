`use strict`;

//Constants and variable declaration
let score = 0;
let highscore = 0;
let randomNumber;
let rem_time = 60;
let begin = false;
let countdownTimer = 0;
const speed = 12;
const hammer = new Audio("hammer.mp3");

// Event Listner to the image of mole so that click on the mole can increase the score and also hide the mole
for (let i = 0; i < 9; i++) {
  document
    .querySelectorAll(".content-img")
    [i].addEventListener("click", function () {
      score++;
      hammer.play();
      document
        .querySelector("#img" + randomNumber)
        .classList.remove("image-visible");
      document.querySelector(".current-score").textContent = "Score: " + score;
    });
}

// Function to generate random number and display the image of the mole corresponding to the number.
function randomNumberGenerator() {
  randomNumber = Math.trunc(Math.random() * 9 + 1);
  document.querySelector("#img" + randomNumber).classList.add("image-visible");
}

// Defining the functionality of the Mole game
function GameRules() {
  randomNumberGenerator();

  setTimeout(function () {
    document
      .querySelector("#img" + randomNumber)
      .classList.remove("image-visible");
    if (rem_time > 0) {
      GameRules();
    } else {
      GameOver();
    }
  }, 10000 / speed);
}

// Inplementing the Timer to the game
function GameTimer() {
  if (rem_time > 0) {
    rem_time--;
    document.querySelector("h1").textContent = rem_time;
  }

  if (rem_time < 0) {
    gameOver();
  }
}

if (rem_time > 0 && begin === true) {
}

// Start The Game
document.addEventListener("keydown", function () {
  if (begin === false) {
    rem_time = 60;
    begin = true;
    countdownTimer = setInterval(GameTimer, 1000);
    GameRules();
    document
      .querySelector("#img" + randomNumber)
      .classList.remove("image-visible");
    document.querySelector(".current-score").textContent = "Score: " + score;
  }
});

// Game Over Function
function GameOver() {
  if (score > highscore) {
    highscore = score;
    document.querySelector(".high-score").textContent =
      "Highscore: " + highscore;
  }
  document.querySelector("h1").textContent =
    "Game Over!! Press a key to play agian";
  score = 0;
  clearInterval(countdownTimer);
  begin = false;
}
