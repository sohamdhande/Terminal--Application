const { spawn } = require("child_process");
const path = require("path");

let currentProcess = null;
let currentSong = null;
let paused = false;

function play(songFilename) {
  stop();

  const songPath = path.join(__dirname, "../songs", songFilename);
  currentSong = songFilename;
  paused = false;

  const processInstance = spawn("mpv", ["--no-video", songPath], {
    stdio: "ignore",
  });
  currentProcess = processInstance;

  processInstance.on("error", () => {
    if (currentProcess === processInstance) {
      currentProcess = null;
      currentSong = null;
      paused = false;
    }
  });

  processInstance.on("exit", () => {
    if (currentProcess === processInstance) {
      currentProcess = null;
      currentSong = null;
      paused = false;
    }
  });
}

function stop() {
  if (currentProcess) {
    if (paused) {
      currentProcess.kill("SIGCONT");
    }
    currentProcess.kill();
    currentProcess = null;
  }
  currentSong = null;
  paused = false;
}

function pause() {
  if (currentProcess && !paused) {
    currentProcess.kill("SIGSTOP");
    paused = true;
    return true;
  }
  return false;
}

function resume() {
  if (currentProcess && paused) {
    currentProcess.kill("SIGCONT");
    paused = false;
    return true;
  }
  return false;
}

function getCurrentSong() {
  return currentSong;
}

function isPaused() {
  return paused;
}

module.exports = {
  play,
  stop,
  pause,
  resume,
  getCurrentSong,
  isPaused,
};
