// abstraction of the properties of a command
// each command will need its own instance of the interface
class commandInterface {
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

  #getCommandResponse(command) {
    throw new Error('error: getCommandResponse method must be implemented by subclasses');
  }

  #displayCommandResponse(response) {
    throw new Error('error: displayCommandResponse method must be implemented by subclasses');
  }
}

module.exports = commandInterface;