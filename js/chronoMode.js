import {
  duration,
  score,
  allTheBox,
  timer,
  randomizeBox,
  currentBox,
} from "./setup.js";

function chronoMode() {
  $("#countdown .countdown-value").html(
    duration.toString().padStart(2, "0") + ":00"
  );

  let timerRunning = false;

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
      }
    };
  }
}

export { chronoMode };
