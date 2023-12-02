let countdown = 0;
let seconds;
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;
let b;

b=sessionStorage.getItem("counter2");
console.log(b);
seconds =sessionStorage.getItem("counter");
console.log(seconds);
const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio');
alarm.setAttribute("src", "ring1.mp3");

startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused
  if(!isPaused){
      b=1;
  }
  else{
    b=0;
  }

  sessionStorage.setItem("counter2", b);
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
  sessionStorage.setItem("counter", seconds);
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
  sessionStorage.setItem("counter", seconds);
})

function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
  sessionStorage.setItem("counter", seconds);
}


let increment = 1;

let incrementFunctions =
    {"#work-plus": function () { workTime = Math.min(workTime + increment, 60)},
     "#work-minus": function () { workTime = Math.max(workTime - increment, 1)},
     "#break-plus": function () { breakTime = Math.min(breakTime + increment, 60)},
     "#break-minus": function () { breakTime = Math.max(breakTime - increment, 1)}};

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
}


function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;
}
sessionStorage.setItem("counter", seconds);
if(b==1){
    clearInterval(countdown);
    isPaused = !isPaused;
    if (!isPaused) {
      countdown = setInterval(timer, 1000);
    }
}

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;
