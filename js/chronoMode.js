import {
  score,
  allTheBox,
  timer,
  randomizeBox,
  currentBox,
  mode,
  highscoreDisplayer,
  initializeHighscore,
  updateHighscore,
} from "./setup.js";

export function chronoMode() {
  // Affichage du highscore selon le mode
  if (mode === "1") {
    highscoreDisplayer.textContent = localStorage.highscore1Min;
  } else if (mode === "2") {
    highscoreDisplayer.textContent = localStorage.highscore2Min;
  }

  // Initialisation du chrono affiché
  const countdownValue = document.querySelector("#countdown .countdown-value");
  countdownValue.textContent = mode.toString().padStart(2, "0") + ":00";

  let timerRunning = false;

  // Bouton démarrer / recommencer
  let startButton = document.getElementById("start-button");
  startButton.replaceWith(startButton.cloneNode(true)); // supprime anciens listeners
  startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    score.textContent = "0";

    if (!timerRunning) {
      timer.start({
        countdown: true,
        startValues: { minutes: parseInt(mode) },
      });
      timerRunning = true;
      startButton.textContent = "Arrêter";
      randomizeBox();
    } else {

      timer.reset();
      countdownValue.textContent = mode.toString().padStart(2, "0") + ":00";
      timer.pause();
      timerRunning = false;
      startButton.textContent = "Commencer";
    }
  });

  // Mise à jour du chrono à chaque seconde
  timer.addEventListener("secondsUpdated", function () {
    countdownValue.textContent = timer
      .getTimeValues()
      .toString(["minutes", "seconds"]);
  });

  // Quand le chrono atteint 0
  timer.addEventListener("targetAchieved", function () {
    countdownValue.textContent = "GG";
    timerRunning = false;
    startButton.textContent = "Commencer";
  });

  // Listeners sur les cases
  for (let box of allTheBox) {
    box.onclick = (e) => {
      if (!timerRunning) return; 
      if (e.target.id === currentBox) {
        randomizeBox();
        score.textContent = parseInt(score.textContent) + 1;
        updateHighscore(mode);
      }
    };
  }
}
