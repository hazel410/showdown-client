export class Message {
  message;
  isValidCommand;
  constructor(message) {
    this.message = message;
  }
  
  parseMessage() {}

  printInfo() {
    console.log(`Error: Invalid Command`);
  }
}

export default Message;