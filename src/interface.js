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

  init() {
    throw new Error('init method must be implemented by subclasses');
  }

  handleCommand(command) {
    throw new Error('handleCommand method must be implemented by subclasses');
  }

  getAliases() {
    throw new Error('getAliases method must be implemented by subclasses');
  }

  getID() {
    throw new Error('getID method must be implemented by subclasses');
  }
}