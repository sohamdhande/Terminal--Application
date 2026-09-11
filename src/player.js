const { spawn } = require("child_process");
const path = require("path");

let currentProcess = null;
let currentSong = null;

function play(songFilename) {
  stop();

  const songPath = path.join(__dirname, "../songs", songFilename);
  currentSong = songFilename;

  currentProcess = spawn("mpv", ["--no-video", songPath], { stdio: "ignore" });

  currentProcess.on("error", () => {
    currentProcess = null;
    currentSong = null;
  });

  currentProcess.on("exit", () => {
    currentProcess = null;
    currentSong = null;
  });
}

function stop() {
  if (currentProcess) {
    currentProcess.kill();
    currentProcess = null;
  }
  currentSong = null;
}

function getCurrentSong() {
  return currentSong;
}

module.exports = {
  play,
  stop,
  getCurrentSong,
};
