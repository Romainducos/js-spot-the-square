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

function chronoMode() {
  if (mode === "1") {
    highscoreDisplayer.innerHTML = localStorage.highscore1Min;
  } else if (mode === "2") {
    highscoreDisplayer.innerHTML = localStorage.highscore2Min;
  }

  console.info(mode);
  $("#countdown .countdown-value").html(
    mode.toString().padStart(2, "0") + ":00"
  );

  let timerRunning = false;

  $("#startButton")
    .off()
    .click(function () {
      score.innerHTML = "0";
      if (!timerRunning) {
        timer.start({ countdown: true, startValues: { minutes: mode } });
        timerRunning = true;
        $(this).text("arreter");
        randomizeBox();
      } else {
        timer.reset();
        $("#countdown .countdown-value").html(
          mode.toString().padStart(2, "0") + ":00"
        );
        timer.pause();
        timerRunning = false;
        $(this).text("Commencer");
      }
    });

  timer.addEventListener("secondsUpdated", function () {
    $("#countdown .countdown-value").html(
      timer.getTimeValues().toString(["minutes", "seconds"])
    );
  });

  timer.addEventListener("targetAchieved", function () {
    $("#countdown .countdown-value").html("GG");
    timerRunning = false;
    $("#startButton").text("Commencer");
  });

  // Listeners sur les cases
  for (let box of allTheBox) {
    box.onclick = (e) => {
      if (e.target.id === currentBox) {
        randomizeBox();
        score.innerHTML = parseInt(score.innerHTML) + 1;
        updateHighscore(mode);
      }
    };
  }
}

export { chronoMode };
