import {Message} from "./message.js";
export class AbilityMessage extends Message {
  name;
  effect;
  dexLink;
  extraInfo;
  constructor(message) {
    super(message);
  }
  parseMessage() {
    // 1. Get dexLink, name, and effect
    let regexp = /(?<dexLink>https:\/\/dex.pokemonshowdown.com\/abilities\/[\w ]+)\"\>(?<name>[^\<]+).*abilitydesccol\"\>(?<effect>[^\<]+)/;
    if (!regexp.test(this.message)) return false;
    let match = regexp.exec(this.message);
    this.dexLink = match.groups.dexLink;
    this.name = match.groups.name;
    this.effect = match.groups.effect;

    // 2. Strip html tags for easier parsing
    this.stripHTMLTags();

    // 3. Get extraInfo
    regexp = /\s+(?<extraInfo>Gen: .*)/;
    if (!regexp.test(this.message)) return false;
    match = this.message.match(regexp);
    this.extraInfo = match.groups.extraInfo;
    // Remove whitespace after pipes
    regexp = /\| /g;
    this.extraInfo = this.extraInfo.replaceAll(regexp, '|');
    return true; 
  }
  printInfo() {
    console.log(`${this.name}|${this.effect}`);
    console.log(this.extraInfo);
    console.log(this.dexLink);
  }
}
export default AbilityMessage;