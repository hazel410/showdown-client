import './interface';
const {Dex} = require('pokemon-showdown');
const readLine = require('readline');

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
    this.commandAliases(commandInterface.getComamndAliases());
    this.commandInterfaces.push(commandInterface);
    commandInterface.init(this);
  }

  dispatchCommand(command) {
    for (let i = 0; i < this.commandAliases.length; i++) {
      if (this.commandAliases.includes(command)) {
        this.commandInterfaces[i].handleCommand(command);
        break;
      }
    }
  }
}

function recursivePrompt() {
  const TEXT_LINE = '########################\n';
  const VALID_EXIT_COMMANDS = ['/exit', '/ex', 'exit', 'ex'];
  const readInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readInterface.question(TEXT_LINE, (command) => {
    if (VALID_EXIT_COMMANDS.includes(command.toLowerCase())) {
      readInterface.close();
      return;
    } else {
      // command ->
      // commandManager ->
      // commandInterface ->
      // commandInterface.getCommandResponse(command) 
      // commandInterface.displayCommandResponse(response) 
      console.log(Dex.species.get('chimchar'));
      recursivePrompt();
    }
  });
}

function main() {
  // init all plugins... this cannot be the right way to do this
  const manager = new commandManager();
  manager.registerInterface(new detailsCommand());
}
