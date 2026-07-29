import {Message} from "./message.js";
export class MoveMessage extends Message {
  name;
  type;
  category;
  power;
  accuracy;
  PP;
  effect;
  extraInfo;
  dexLink;
  constructor(message) {
    super(message);
  }

  parseMessage() {
    // 1. Get type and category
    let regexp = /(\/types\/(?<type>\w*)).*(\/categories\/(?<category>\w*))/;
    let match = regexp.exec(this.message);
    this.type = match.groups.type; 
    this.category = match.groups.category;

    // 2. Get smogon link
    regexp = /(?<link>https:\/\/dex.pokemonshowdown.com\/moves\/\w+)/;
    if (!regexp.test(this.message)) return false;
    match = regexp.exec(this.message);
    this.dexLink = match.groups.link;

    // 3. Strip html tags for easier parsing
    this.stripHTMLTags();
    // 4. Get move name, power, acc, and effect
    regexp = /\s{2}(?:(?<name>.+)\s{2})(?:Power(?<power>[—0-9]+))?.*?(?:Accuracy(?<accuracy>[0-9\%]+))?[\s](?:PP(?<PP>[0-9]+))[\s](?<effect>.*)/;
    if (!regexp.test(this.message)) return false;
    match = this.message.match(regexp);
    this.name = match.groups.name;
    this.power = (match.groups.power)?(match.groups.power):'—';
    this.accuracy = (match.groups.accuracy)?(match.groups.accuracy):'—';
    this.PP = match.groups.PP;
    this.effect = match.groups.effect;

    // 5. Get additional info
    regexp = /\s+(?<extraInfo>Priority: .*)/;
    if (!regexp.test(this.message)) return false;
    match = this.message.match(regexp);
    this.extraInfo = match.groups.extraInfo;
    // Remove whitespace after pipes
    regexp = /\| /g;
    this.extraInfo = this.extraInfo.replaceAll(regexp, '|');
    return true;
  }
  printInfo() {
    console.log(`${this.name}|${this.type}|${this.category}|Power: ${this.power}|Accuracy: ${this.accuracy}|PP: ${this.PP}`)
    console.log(this.effect);
    console.log(this.extraInfo);
    console.log(this.dexLink);
  }
}
export default MoveMessage;