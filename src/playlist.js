const fs = require("fs");
const path = require("path");

const songsDir = path.join(__dirname, "../songs");

function getSongs() {
  if (!fs.existsSync(songsDir)) {
    return [];
  }

  const files = fs.readdirSync(songsDir);
  const supportedExtensions = [".mp3", ".wav", ".ogg"];

  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return supportedExtensions.includes(ext);
  });
}

function getSongByNumber(num) {
  const songs = getSongs();
  const index = parseInt(num, 10) - 1;

  if (isNaN(index) || index < 0 || index >= songs.length) {
    return null;
  }

  return songs[index];
}

function getNextSong(currentSong) {
  const songs = getSongs();
  const index = songs.indexOf(currentSong);

  if (index === -1 || index >= songs.length - 1) {
    return null;
  }

  return songs[index + 1];
}

function getPrevSong(currentSong) {
  const songs = getSongs();
  const index = songs.indexOf(currentSong);

  if (index <= 0) {
    return null;
  }

  return songs[index - 1];
}

module.exports = {
  getSongs,
  getSongByNumber,
  getNextSong,
  getPrevSong,
};
