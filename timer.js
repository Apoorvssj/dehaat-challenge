let timerRef = document.querySelector(".mainTime");

function time_remaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    total: t,
    minutes: minutes,
    seconds: seconds,
  };
}

var timeinterval;
function run_clock(endtime) {
  function update_clock() {
    var t = time_remaining(endtime);
    timerRef.innerHTML = t.minutes + ":" + t.seconds;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  update_clock(); // run function once at first to avoid delay
  timeinterval = setInterval(update_clock, 1000);
}

var paused = false;
var time_left;
var deadline;

function pause_clock() {
  if (!paused) {
    paused = true;
    clearInterval(timeinterval); // stop the clock
    time_left = time_remaining(deadline).total; // preserve remaining time
  }
}

function resume_clock() {
  if (paused) {
    paused = false;
    // update the deadline to preserve the amount of time remaining
    deadline = new Date(Date.parse(new Date()) + time_left);

    // start the clock
    run_clock(deadline);
  } else {
    var inputValue = document.getElementById("timeinput").value;
    var current_time = Date.parse(new Date());
    deadline = new Date(current_time + inputValue * 60 * 1000);
    run_clock(deadline);
  }
}

// handle pause and resume button clicks
document.getElementById("stop").onclick = pause_clock;
document.getElementById("start").onclick = resume_clock;
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timeinterval);
  paused = false;
  timerRef.innerHTML = "00:00";
});
