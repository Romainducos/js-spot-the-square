import { score, allTheBox, randomizeBox, currentBox } from "./setup.js";

function survivalMode() {
  let survivalTime = 3;
  let minTime = 1;
  let timeDecrease = 0.2;
  let currentTimeout = null;
  let currentInterval = null;
  let gameOver = false;
  let lives = 3;
  let roundStart = null;

  score.innerHTML = "0";
  $("#startButton").hide();
  $("#countdown .countdown-value").html(
    survivalTime.toFixed(2) + "s | Vies : " + lives
  );

  function updateCountdownDisplay() {
    if (!roundStart) return;
    const elapsed = (Date.now() - roundStart) / 1000;
    const remaining = Math.max(0, survivalTime - elapsed);
    $("#countdown .countdown-value").html(
      remaining.toFixed(2) + "s | Vies : " + lives
    );
  }

  function nextRound() {
    if (gameOver) return;
    randomizeBox();
    roundStart = Date.now();
    $("#countdown .countdown-value").html(
      survivalTime.toFixed(2) + "s | Vies : " + lives
    );

    if (currentTimeout) clearTimeout(currentTimeout);
    if (currentInterval) clearInterval(currentInterval);

    currentTimeout = setTimeout(() => {
      loseLife();
    }, survivalTime * 1000);

    currentInterval = setInterval(() => {
      updateCountdownDisplay();
    }, 100);
  }

  function loseLife() {
    lives--;
    if (currentInterval) clearInterval(currentInterval);
    if (lives <= 0) {
      endSurvival();
    } else {
      $("#countdown .countdown-value").html(
        survivalTime.toFixed(2) + "s | Vies : " + lives
      );
      nextRound();
    }
  }

  function endSurvival() {
    gameOver = true;
    if (currentInterval) clearInterval(currentInterval);
    $("#countdown .countdown-value").html("Perdu !");
    $("#startButton")
      .show()
      .text("Rejouer")
      .off()
      .click(() => window.location.reload());
  }

  // Listeners sur les cases
  for (let box of allTheBox) {
    box.onclick = (e) => {
      if (gameOver) return;
      if (e.target.id === currentBox) {
        if (currentInterval) clearInterval(currentInterval);
        score.innerHTML = parseInt(score.innerHTML) + 1;
        survivalTime = Math.max(minTime, survivalTime - timeDecrease);
        nextRound();
      } else {
        loseLife();
      }
    };
  }

  nextRound();
}

export { survivalMode };
