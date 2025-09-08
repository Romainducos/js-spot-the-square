var timer = new easytimer.Timer();

$("#countdown .countdown-value").html("02:00");

var timerRunning = false;

$("#startButton").click(function () {
  if (!timerRunning) {
    timer.start({ countdown: true, startValues: { minutes: 2 } });
    timerRunning = true;
    $(this).text("Recommencer");
  } else {
    timer.reset();
    $("#countdown .countdown-value").html("02:00");
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

const allTheBox = document.querySelectorAll(".chessboard button");

const boxClicked = (e) => {
  console.log(e.target.id);
};

for (let box of allTheBox) {
  box.addEventListener("click", boxClicked);
}
