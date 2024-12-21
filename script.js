let timer;
let timeLeft;
let isRunning = false;
let isWorkSession = true;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let cyclesCompleted = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const cycleCountDisplay = document.getElementById('cycle-count');
const breakDecreaseButton = document.getElementById('break-decrease');
const breakIncreaseButton = document.getElementById('break-increase');
const workDecreaseButton = document.getElementById('work-decrease');
const workIncreaseButton = document.getElementById('work-increase');
const breakDurationDisplay = document.getElementById('break-duration-display');
const workDurationDisplay = document.getElementById('work-duration-display');

function initializeTimer() {
  timeLeft = isWorkSession ? workDuration : breakDuration;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.innerText = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleSessionEnd();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = isWorkSession ? workDuration : breakDuration;
  updateTimerDisplay();
}

function handleSessionEnd() {
  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession ? workDuration : breakDuration;
  cyclesCompleted++;
  cycleCountDisplay.innerText = cyclesCompleted;
  initializeTimer();
}

function adjustDuration(durationType, change) {
  if (durationType === 'work') {
    workDuration = Math.max(60, workDuration + change * 60);
    workDurationDisplay.innerText = workDuration / 60;
  } else if (durationType === 'break') {
    breakDuration = Math.max(60, breakDuration + change * 60);
    breakDurationDisplay.innerText = breakDuration / 60;
  }
  resetTimer();
}

workDecreaseButton.addEventListener('click', () => adjustDuration('work', -1));
workIncreaseButton.addEventListener('click', () => adjustDuration('work', 1));
breakDecreaseButton.addEventListener('click', () => adjustDuration('break', -1));
breakIncreaseButton.addEventListener('click', () => adjustDuration('break', 1));

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

initializeTimer();
