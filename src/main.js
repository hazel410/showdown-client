const {Dex} = require('pokemon-showdown');
const readLine = require('readline');

// manages the command interfaces
// directly uses the user's command
// and passes it off to the corresponding
// instance of the interface
class commandManager {
  constructor() {
    this.commandIDs = [];
    this.commandAliases = [];
  }

  processCommand(command) {
    this.emit('command', command);
  }
}


// abstraction of the properties of a command
// each command will need its own instance of the interface
class commandInterface {
  constructor() {
    if (this.constructor === commandInterface) {
      throw new Error('error: commandInterface class cannot be instantiated directly');
    }
  }

  init(commandManager) {
    throw new Error('error: init method must be implemented by subclasses');
  }

  getCommandResponse(command) {
    throw new Error('error: getCommandResponse method must be implemented by subclasses');
  }

  displayCommandResponse(response) {
    throw new Error('error: displayCommandResponse method must be implemented by subclasses');
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

recursivePrompt();
