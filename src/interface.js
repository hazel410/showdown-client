// abstraction of the properties of a command
// each command will need its own instance of the interface
export class commandInterface {
  ID = ''
  aliases = [];
  constructor() {
    if (this.constructor === commandInterface) {
      throw new Error('commandInterface class cannot be instantiated directly');
    }
  }

  init(commandManager) {
    commandManager.on('command', this.handleCommandEvent.bind(this));
  }

  handleCommandEvent(command, response) {
    if (this.aliases.includes(this.getCommandToken(command))) {

    }
  }

  displayResponse(response) {
    throw new Error('formatResponse method must be implemented by subclasses');
  }

  getAliases() {
    return this.aliases;
  }

  getID() {
    return this.ID;
  }
}