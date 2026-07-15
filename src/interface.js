import Dex from "pokemon-showdown";
// abstraction of the properties of a command
// each command will need its own instance of the interface
export class commandInterface {
  aliases = [];
  
  constructor() {
    if (this.constructor === commandInterface) {
      throw new Error('error: commandInterface class cannot be instantiated directly');
    }
  }

  init() {
    throw new Error('error: init method must be implemented by subclasses');
  }

  handleCommand(command) {
    throw new Error('error: handleCommand method must be implemented by subclasses');
  }

  getCommandAliases() {
    return this.aliases;
  }
}