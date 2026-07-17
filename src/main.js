import readLine from 'readline';
import WebSocket from "ws";

const TEXT_LINE = '########################';
const VALID_EXIT_COMMANDS = ['/exit', '/ex', 'exit', 'ex'];
const COMMAND_TOKEN = '/';
const SHOWDOWN_SOCKET_ADDRESS = 'ws://sim3.psim.us:8000/showdown/websocket'

class programManager {
  constructor() {
    this.socket = new WebSocket(SHOWDOWN_SOCKET_ADDRESS);
    this.readlineInterface = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.socket.on('open', () => {
      console.log('[status]: connected to showdown servers');
      this.recursivePrompt();
    });

    this.socket.on('message', (message) => {
      this.displayServerResponse(message);
    });
  }

  recursivePrompt() {
    this.readlineInterface.question("", (command) => {
      if (VALID_EXIT_COMMANDS.includes(command.toLowerCase())) {
        this.shutdown();
      } else {
        this.socket.send(this.getFormattedCommand(command));
        this.recursivePrompt(this.readlineInterface);
      }
    });
  }

  getFormattedCommand(command) {
    // if starts with no token, add the command token
    // else, replace whatever is there with the command token
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    if (alphabet.includes(command.slice(0, 1).toLowerCase())) {
      return `|${COMMAND_TOKEN}${command}`;
    } else {
      return `|${COMMAND_TOKEN}${command.slice(1)}`;
    }
  }

  displayServerResponse(response) {
    response = `${response}`
    if (response.slice(0, 12) !== "|updateuser|") {
      console.log(TEXT_LINE);
      console.log(`[server]: ${response}`);
      console.log(TEXT_LINE);
    }
  }

  shutdown() {
    this.readlineInterface.close();
    this.socket.close();
    console.log('[status]: exiting program...')
    process.exit(0);
  }
}

function main() {
  new programManager();
}

main()