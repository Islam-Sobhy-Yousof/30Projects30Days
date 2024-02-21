const minutesInput = document.querySelector(".minutes").firstElementChild;
const secondsInput = document.querySelector(".seconds").firstElementChild;
const startBtn = document.querySelector(".start");
const timeUpPopUp = document.querySelector(".alert-message");
const timerRing = document.querySelector(".ring");
const timerSettings = document.querySelector(".settings");
let hasStarted = false;
let timerIntervalId = null;
timerSettings.addEventListener('click',function(){
    minutesInput.toggleAttribute("disabled");
    secondsInput.toggleAttribute("disabled");
})
startBtn.addEventListener("click", function () {
  if (hasStarted === false) {
    startBtn.textContent = "Pause";
    hasStarted = true;
    timerIntervalId = setInterval(timerCountDown, 1000);
  } else {
    clearInterval(timerIntervalId);
    startBtn.textContent = "Start";
    hasStarted = false;
  }
});
timeUpPopUp.addEventListener("click", function () {
  timeUpPopUp.classList.remove("alert-animation");
  timerRing.classList.remove("ending");
  minutesInput.value = "15";
  secondsInput.value = "00";
  startBtn.textContent = "Start";
  hasStarted = false;
});
const timerUp = function () {
  timerRing.classList.add("ending");
  timeUpPopUp.classList.add("alert-animation");
};
const timerCountDown = function () {
  let minutes = parseInt(minutesInput.value);
  let seconds = parseInt(secondsInput.value);
  if (seconds === 0) {
    if (minutes > 0) {
      seconds = 60;
      minutes -= 1;
    }
  }
  seconds -= 1;
  minutesInput.value = minutes < 10 ? `0${minutes}` : `${minutes}`;
  secondsInput.value = seconds < 10 ? `0${seconds}` : `${seconds}`;
  if (minutes === 0 && seconds === 0) {
    clearInterval(timerIntervalId);
    timerUp();
  }
};
