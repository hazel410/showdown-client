import {Message} from "./message.js";
export class TextMessage extends Message {
  constructor(message) {
    super(message);
  }
  parseMessage() {
    // TODO THIS SHIT
    // 1. Strip html tags
    console.log("TODO: text messages");
    return false;
    let regexp = /<[^>]*>/g;
    const replaceStr = '';
    this.message = this.message.replaceAll(regexp, replaceStr);
    regexp = /((ThickSpace;\&\#[0-9]+)|(ThickSpace)|(\&)|(nbsp)|(;)|(\|pm\|)|(Guest [0-9]+\|\~\|\/raw))*/g;
    this.message = this.message.replaceAll(regexp, replaceStr);

    // 2. Remove/add whitespace where necessary
    regexp = /  /g;
    this.message = this.message.replaceAll(regexp, replaceStr);
    regexp = /\#x2f/g;
    this.message = this.message.replaceAll(regexp, '/');
    regexp = /(?<pre>[:a-z])(?<post>[A-Z])/g;
    this.message = this.message.replaceAll(regexp,"$<pre>\n$<post>");
  
    return true;
  }
  printInfo() {
    console.log(this.message);
  }
}
export default TextMessage;