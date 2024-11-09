// script.js
let startTime = 0;
let elapsedTime = 0;
let running = false;
let timerInterval = null;
let lapCount = 1;

const timeDisplay = document.getElementById("timeDisplay");
const lapList = document.getElementById("lapList");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

function updateTime() {
  if (running) {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }
}

function toggleStartPause() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startPauseBtn.textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    running = true;
    startPauseBtn.textContent = "Pause";
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapList.innerHTML = '';
  startPauseBtn.textContent = "Start";
  lapCount = 1;
}

function recordLap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
  }
}

