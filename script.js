const buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start the game on keypress
document.addEventListener("keypress", () => {
  if (!started) {
    document.querySelector("#level-title").textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = `Level ${level}`;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    document.getElementById(randomColor).classList.add("flash");
    playSound(randomColor);
    setTimeout(() => {
      document.getElementById(randomColor).classList.remove("flash");
    }, 200);
  }, 500);
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Play sound
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Animate button press
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}
