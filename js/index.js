var timer = new easytimer.Timer();


$('#countdownExample .values').html('00:02:00');

$('.startButton').click(function () {
  timer.start({countdown: true, startValues: {minutes : 2}});
});

$('.resetButton').click(function () {
  timer.reset();
  $('#countdownExample .values').html('00:02:00');
  timer.pause();
});

timer.addEventListener('secondsUpdated', function (e) {
    $('#countdownExample .values').html(timer.getTimeValues().toString());
});

timer.addEventListener('targetAchieved', function (e) {
    $('#countdownExample .values').html('GG');
});