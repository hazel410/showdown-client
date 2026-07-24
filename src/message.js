export class Message {
  message;
  constructor(message) {
    this.message = message;
  }
  
  parseMessage() {
    return `Error: Invalid Command`;
  }
}

export default Message;