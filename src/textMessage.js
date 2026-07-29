import {Message} from "./message.js";
export class TextMessage extends Message {
  constructor(message) {
    super(message);
  }
  parseMessage() {
    // TODO THIS SHIT
    // 1. Strip html tags
    this.stripHTMLTags();

    // 2. Remove/add whitespace where necessary
    let regexp = /  /g;
    this.message = this.message.replaceAll(regexp, '');
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