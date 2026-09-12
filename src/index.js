const readline = require("readline");
const playlist = require("./playlist");
const player = require("./player");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("Terminal Music Player");
console.log('Type "help" to see available commands.');

rl.prompt();

rl.on("line", (line) => {
  const trimmed = line.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0] ? parts[0].toLowerCase() : "";

  switch (command) {
    case "help":
      console.log("\nAvailable commands:");
      console.log("  help");
      console.log("  list");
      console.log("  play <number>");
      console.log("  pause");
      console.log("  resume");
      console.log("  next");
      console.log("  prev");
      console.log("  stop");
      console.log("  current");
      console.log("  quit");
      console.log("  exit\n");
      break;

    case "list": {
      const songs = playlist.getSongs();
      if (songs.length === 0) {
        console.log("No songs found in songs directory.");
      } else {
        songs.forEach((song, index) => {
          console.log(`${index + 1}. ${song}`);
        });
      }
      break;
    }

    case "play": {
      const numberArg = parts[1];
      if (!numberArg) {
        console.log("Invalid song number.");
        break;
      }
      const song = playlist.getSongByNumber(numberArg);
      if (!song) {
        console.log("Invalid song number.");
      } else {
        player.play(song);
        console.log(`Now playing: ${song}`);
      }
      break;
    }

    case "pause": {
      if (!player.getCurrentSong()) {
        console.log("No song is currently playing.");
      } else if (player.isPaused()) {
        console.log("Playback is already paused.");
      } else {
        player.pause();
        console.log("Playback paused.");
      }
      break;
    }

    case "resume": {
      if (!player.getCurrentSong()) {
        console.log("No song is currently playing.");
      } else if (!player.isPaused()) {
        console.log("Playback is not paused.");
      } else {
        player.resume();
        console.log("Playback resumed.");
      }
      break;
    }

    case "next": {
      const songs = playlist.getSongs();
      if (songs.length === 0) {
        console.log("No songs found in songs directory.");
        break;
      }

      const currentSong = player.getCurrentSong();
      if (!currentSong) {
        console.log("No song is currently playing.");
        break;
      }

      const currentIndex = songs.indexOf(currentSong);
      if (currentIndex === -1) {
        console.log("No song is currently playing.");
        break;
      }

      const nextSong = playlist.getNextSong(currentSong);
      if (!nextSong) {
        console.log("Already at the last song.");
      } else {
        player.play(nextSong);
        console.log(`Now playing: ${nextSong}`);
      }
      break;
    }

    case "prev": {
      const songs = playlist.getSongs();
      if (songs.length === 0) {
        console.log("No songs found in songs directory.");
        break;
      }

      const currentSong = player.getCurrentSong();
      if (!currentSong) {
        console.log("No song is currently playing.");
        break;
      }

      const currentIndex = songs.indexOf(currentSong);
      if (currentIndex === -1) {
        console.log("No song is currently playing.");
        break;
      }

      const prevSong = playlist.getPrevSong(currentSong);
      if (!prevSong) {
        console.log("Already at the first song.");
      } else {
        player.play(prevSong);
        console.log(`Now playing: ${prevSong}`);
      }
      break;
    }

    case "stop":
      player.stop();
      console.log("Playback stopped.");
      break;

    case "current": {
      const song = player.getCurrentSong();
      if (song) {
        console.log(`Current song: ${song}`);
      } else {
        console.log("No song is currently playing.");
      }
      break;
    }

    case "quit":
    case "exit":
      player.stop();
      console.log("Goodbye!");
      rl.close();
      return;

    case "":
      break;

    default:
      console.log('Unknown command. Type "help" for available commands.');
  }

  rl.prompt();
});

rl.on("close", () => {
  player.stop();
  process.exit(0);
});