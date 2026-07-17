import {detailsCommand} from "../data/commands/details.js";
import readLine from 'readline';
import WebSocket from "ws";

const TEXT_LINE = '########################\n';
const VALID_EXIT_COMMANDS = ['/exit', '/ex', 'exit', 'ex'];
const COMMAND_TOKEN = '/';

// manages the command interfaces
// directly uses the user's command
// and passes it off to the corresponding
// instance of the interface
class commandManager {
  constructor() {
    this.commandInterfaces = [];
    this.socket = new WebSocket('ws://sim3.psim.us:8000/showdown/websocket');

    this.socket.on('connection', (ws) => {
      ws.on('message', (response) => {
        // this.dispatchCommand(response);
        console.log(`status: recieved response ${response}`);
      });
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    }); 
  }

  registerInterface(commandInterface) {
    // this function should be called at the beginning and then never again
    this.commandInterfaces.push(commandInterface);
    commandInterface.init(this);
    console.log(`> status: ${commandInterface.getID()} interface registered`);
  }

  getCommandToken(rawCommand) {
    // supports commands of the form
    // "/dt chimchar" and "dt chimchar"
    let tokenPosition = rawCommand.search(COMMAND_TOKEN);
    let spacePosition = rawCommand.search(" ");

    // sanitizes inputs
    // eg: "/dt basculegion" -> "dt basculegion"
    if (tokenPosition === 0) {
      rawCommand = rawCommand.slice(1);
    }

    // gets all of the string before the first space,
    // getting all of the string when no spaces
    if (spacePosition !== -1) {
      rawCommand = rawCommand.slice(0, spacePosition - 1);
    }

    return rawCommand.toLowerCase();
  }

  dispatchCommand(command) {
    let currentInterface;
    let currentCommandToken;
    this.socket.send(`|${command}`);
    for (i = 0; i < this.commandInterfaces.length; i++) {
      currentInterface = this.commandInterfaces[i];
      currentCommandToken = this.getCommandToken
      if (currentInterface.getAliases().includes(currentCommandToken)) {
        currentInterface.handleCommand();
      }
    }
    // console.log(`> status: searching for interface ${command}`)
    // for (let i = 0; i < this.commandAliases.length; i++) {
    //   if (this.commandAliases[i].includes(this.getCommandToken(command))) {
    //     this.commandInterfaces[i].handleCommand(command);
    //     console.log(`> status: interface found!`);
    //     return;
    //   }
    // }
    // console.log('> status: unable to find interface');``
  }

  start(readlineInterface) {
    readlineInterface.question(TEXT_LINE, (command) => {
      if (VALID_EXIT_COMMANDS.includes(command.toLowerCase())) {
        readlineInterface.close();
        console.log('> status: exiting...')
      } else {
        this.socket.send(command);
        this.start(readlineInterface);
      }
    });
  }
}

function main() {
  // init all plugins... (this cannot be the right way to do this)
  const manager = new commandManager();
  manager.registerInterface(new detailsCommand());

  // now, start the manager up!
  const readInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  manager.start(readInterface);
}

main();