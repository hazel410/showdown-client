export class Message {
  message;
  constructor(message) {
    this.message = message;
  }
  stripHTMLTags() {
    let regexp = /<[^>]*>/g;
    const replaceStr = '';
    this.message = this.message.replaceAll(regexp, replaceStr);
    regexp = /((ThickSpace;\&\#[0-9]+)|(ThickSpace)|(\&)|(nbsp)|(;)|(\|pm\|)|(Guest [0-9]+\|\~\|\/raw)|(Guest [0-9]+\|\~\|\/text)|(Guest [0-9]+\|\~\|\/error))*/g;
    this.message = this.message.replaceAll(regexp, replaceStr);
  }
  parseMessage() {}

  printInfo() {
    console.log(`Error: Invalid Command`);
  }

}

export default Message;