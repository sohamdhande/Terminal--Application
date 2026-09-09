const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("Terminal Music Player");
console.log('Type "help" to see available commands.');

rl.prompt();

rl.on("line", (input) => {
  const command = input.trim().toLowerCase();

  switch (command) {
    case "help":
      console.log("\nAvailable commands:");
      console.log("  help");
      console.log("  quit");
      console.log("  exit");
      console.log();
      break;

    case "quit":
    case "exit":
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
  process.exit(0);
});