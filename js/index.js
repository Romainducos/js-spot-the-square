// --- IMPORTS ---
import { currentBox, randomizeBox, randomizedBox } from "../js/boxRandomizer.js";

// --- UTILS ---
function getDurationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const duration = parseInt(params.get("duration"), 10);
  if (!isNaN(duration) && duration > 0) {
    return duration;
  }
  return 2; // valeur par défaut
}

// --- GLOBALS ---
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const duration = getDurationFromUrl();
const score = document.getElementById("score-number");
const allTheBox = document.getElementsByClassName("case");
var timer = new easytimer.Timer();

// --- MAIN ---
if (mode === "survival") {
  $("#countdown .countdown-value").html("3.00s | Vies : 3");
  $("#startButton").off().show().text("Commencer").click(function () {
    survivalMode();
    $(this).hide();
  });
} else {
  chronoMode();
}

// --- CHRONO MODE ---
function chronoMode() {
  $("#countdown .countdown-value").html(
    duration.toString().padStart(2, "0") + ":00"
  );

  var timerRunning = false;

  $("#startButton")
    .off()
    .click(function () {
      score.innerHTML = "0";
      if (!timerRunning) {
        timer.start({ countdown: true, startValues: { minutes: duration } });
        timerRunning = true;
        $(this).text("Recommencer");
        randomizeBox();
      } else {
        timer.reset();
        $("#countdown .countdown-value").html(
          duration.toString().padStart(2, "0") + ":00"
        );
        timer.pause();
        timerRunning = false;
        $(this).text("Commencer");
      }
    });

  timer.addEventListener("secondsUpdated", function (e) {
    $("#countdown .countdown-value").html(
      timer.getTimeValues().toString(["minutes", "seconds"])
    );
  });

  timer.addEventListener("targetAchieved", function (e) {
    $("#countdown .countdown-value").html("GG");
    timerRunning = false;
    $("#startButton").text("Commencer");
  });

  // Listeners sur les cases UNIQUEMENT en mode chrono
  for (let box of allTheBox) {
    box.onclick = (e) => {
      if (e.target.id === currentBox) {
        randomizeBox();
        score.innerHTML = parseInt(score.innerHTML) + 1;
      }
    };
  }
}

// --- SURVIVAL MODE ---
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
  $("#countdown .countdown-value").html(survivalTime.toFixed(2) + "s | Vies : " + lives);

  function updateCountdownDisplay() {
    if (!roundStart) return;
    const elapsed = (Date.now() - roundStart) / 1000;
    const remaining = Math.max(0, survivalTime - elapsed);
    $("#countdown .countdown-value").html(remaining.toFixed(2) + "s | Vies : " + lives);
  }

  function nextRound() {
    if (gameOver) return;
    randomizeBox();
    roundStart = Date.now();
    $("#countdown .countdown-value").html(survivalTime.toFixed(2) + "s | Vies : " + lives);

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
      $("#countdown .countdown-value").html(survivalTime.toFixed(2) + "s | Vies : " + lives);
      nextRound();
    }
  }

  function endSurvival() {
    gameOver = true;
    if (currentInterval) clearInterval(currentInterval);
    $("#countdown .countdown-value").html("Perdu !");
    $("#startButton").show().text("Rejouer").off().click(() => window.location.reload());
  }

  // Listeners sur les cases UNIQUEMENT en mode survie
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
