import {Message} from "./message.js";
export class PokemonMessage extends Message {
  tier;
  name;
  types;
  ability1;
  ability2;
  ability3;
  stats;  // [HP, Atk, Def, SpA, SpD, Spe, BST]
  extraInfo;
  dexLink;
  constructor(message) {
    super(message);
  }
  /* TODO Properly annotate using JS standards */
  parseMessage() {
    // 1. Get type(s)
    let regexp = /(\/types\/(?<type>\w*))/g;
    let match = [...this.message.matchAll(regexp)];
    if (match.length > 1) {
      this.types = match[0].groups.type + "/" + match[1].groups.type;
    } 
    else {
      this.types = match[0].groups.type
    }

    // 2. Get smogon link
    regexp = /(?<link>https:\/\/dex.pokemonshowdown.com\/pokemon\/\w+)/;
    if (!regexp.test(this.message)) return false;
    match = regexp.exec(this.message);
    this.dexLink = match.groups.link;

    // 3. Strip html tags for easier parsing
    this.stripHTMLTags();
    // 4. Get tier, name, abilities, and stats
    regexp = /(?<tier>\w+)  (?<name>\w+(?:[ -]\w+)*)  (?<ability1>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)(?<ability2>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)?(?<ability3>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)?.*?HP(?<HP>[0-9]+) Atk(?<Atk>[0-9]+) Def(?<Def>[0-9]+) SpA(?<SpA>[0-9]+) SpD(?<SpD>[0-9]+) Spe(?<Spe>[0-9]+) BST(?<BST>[0-9]+)/;
    if (!regexp.test(this.message)) return false;
    match = regexp.exec(this.message);
    let groups = match.groups;
    this.tier = groups.tier;
    this.name = groups.name;
    this.ability1 = groups.ability1;
    this.ability2 = groups.ability2;
    this.ability3 = groups.ability3;
    this.stats = [groups.HP, groups.Atk, groups.Def, groups.SpA, groups.SpD, groups.Spe, groups.BST];

    // 5. Get extraInfo
    regexp = /\s+(?<extraInfo>Dex\#: .*)/;
    if (!regexp.test(this.message)) return false;
    match = this.message.match(regexp);
    this.extraInfo = match.groups.extraInfo;
    // Remove whitespace after pipes
    regexp = /\| /g;
    this.extraInfo = this.extraInfo.replaceAll(regexp, '|');
    return true; 
  }

  printInfo() {
    const WS = ' '
    let abilityStr = this.ability1;
    if (this.ability2) {
      abilityStr += '|' + this.ability2
    }
    if (this.ability3) {
      abilityStr += '|' + this.ability3
    }
    console.log(this.tier + WS + this.name + WS + this.types + WS + abilityStr)
    console.log("HP   Atk  Def  SpA  SpD  Spe  BST");
    const stats = this.stats;
    for (let i = 0; i < stats.length; i++) {
      if (stats[i] < 100) {
        stats[i] += WS;
      }
      if (stats[i] < 10) {
        stats[i] += WS;
      }
    }
    console.log(`${stats[0]}  ${stats[1]}  ${stats[2]}  ${stats[3]}  ` + 
      `${stats[4]}  ${stats[5]}  ${stats[6]}`);
    console.log(this.extraInfo);
    console.log(this.dexLink);
  }
}

export default PokemonMessage;