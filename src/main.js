import {detailsCommand} from "../data/commands/details.js";
import readLine from 'readline';

const TEXT_LINE = '########################\n';
const VALID_EXIT_COMMANDS = ['/exit', '/ex', 'exit', 'ex'];
const COMMAND_TOKEN = '/';

// manages the command interfaces
// directly uses the user's command
// and passes it off to the corresponding
// instance of the interface
class commandManager {
  constructor() {
    this.commandAliases = [];
    this.commandInterfaces = [];
  }

  registerInterface(commandInterface) {
    // this function should be called at the beginning and then never again
    console.log(commandInterface);
    this.commandAliases.push(commandInterface.getCommandAliases());
    this.commandInterfaces.push(commandInterface);
    commandInterface.init(this);
  }

  getRawCommandName(rawCommand) {
    // supports commands of the form
    // > "/dt chimchar" and
    // > "dt chimchar"
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
      rawCommand = rawCommand.slice(0, spacePosition);
    }

    return rawCommand.toLowerCase();
  }

  dispatchCommand(command) {
    console.log(`status: searching for interface ${command}`)
    for (let i = 0; i < this.commandAliases.length; i++) {
      if (this.commandAliases.includes(this.getRawCommandName(command))) {
        console.log(`status: interface found!`);
        this.commandInterfaces[i].handleCommand(command);
        break;
      }
    }
    console.log('status: unable to find interface');
  }

  start() {
    const readInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
    });
  
    readInterface.question(TEXT_LINE, (command) => {
      if (VALID_EXIT_COMMANDS.includes(command.toLowerCase())) {
        readInterface.close();
        return;
      } else {
        this.dispatchCommand(command);
      }
    });
  }
}

function main() {
  // init all plugins... (this cannot be the right way to do this)
  const manager = new commandManager();
  manager.registerInterface(new detailsCommand());

  // now, start the manager up!
  manager.start();
}

main();