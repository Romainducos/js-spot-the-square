import {randomizeBox} from './boxRandomizer.js';

function getDurationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const duration = parseInt(params.get("duration"), 10);
  if (!isNaN(duration) && duration > 0) {
    return duration;
  }
  return 2; // valeur par défaut
}

var timer = new easytimer.Timer();

var duration = getDurationFromUrl();

$("#countdown .countdown-value").html(
  duration.toString().padStart(2, "0") + ":00"
);

var timerRunning = false;


///////////////////////////////////////////////////////////////////////
///                                                                 ///
///                 GAME START                                      ///
///                                                                 ///
///////////////////////////////////////////////////////////////////////

$("#startButton").click(function () {
  randomizeBox()

  if (!timerRunning) {
    timer.start({ countdown: true, startValues: { minutes: duration } });
    timerRunning = true;
    $(this).text("Recommencer");
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
  $(".startButton").text("Start");
});

const allTheBox = document.getElementsByTagName("button");

const boxClicked = (e) => {
  console.log(e.target.id);
};

for (let box of allTheBox) {
  box.addEventListener("click", boxClicked);
}
