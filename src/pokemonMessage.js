import {Message} from "./message.js";
export class PokemonMessage extends Message {
  tier;
  name;
  types;
  ability1;
  ability2;
  ability3;
  stats;  // [HP, Atk, Def, SpA, SpD, Spe, BST]
  dexNo;
  genNo;
  height;
  weight;
  dexColour;
  eggGroups;
  preEvolution;
  evolutions;
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
    regexp = /<[^>]*>/g;
    const replaceStr = '';
    this.message = this.message.replaceAll(regexp, replaceStr);
    
    // 4. Get all non-optional fields
    regexp = /\/raw (?<tier>\w+)  (?<name>\w+(?: \w+)?)  (?<ability1>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)(?<ability2>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)?(?<ability3>[A-Z]*[a-z]*(?: [A-Z]*[a-z]*)?)?.*?HP(?<HP>[0-9]+) Atk(?<Atk>[0-9]+) Def(?<Def>[0-9]+) SpA(?<SpA>[0-9]+) SpD(?<SpD>[0-9]+) Spe(?<Spe>[0-9]+) BST(?<BST>[0-9]+)[\s\S]*Dex\#: (?<dexNo>[0-9]+).*Gen: (?<genNo>[0-9]+).*Height: (?<height>[0-9\.\w ]+).*Weight: (?<weight>[^\)]*\)).*Dex Colour: (?<dexColour>\w*).*Egg Group\(s\): (?<eggGroups>[^\&]*)/;
    if (!regexp.test(this.message)) return false;
    match = regexp.exec(this.message);
    let groups = match.groups;
    this.tier = groups.tier;
    this.name = groups.name;
    this.ability1 = groups.ability1;
    this.ability2 = groups.ability2;
    this.ability3 = groups.ability3;
    this.stats = [groups.HP, groups.Atk, groups.Def, groups.SpA, groups.SpD, groups.Spe, groups.BST];
    this.dexNo = groups.dexNo;
    this.genNo = groups.genNo;
    this.height = groups.height;
    this.weight = groups.weight;
    this.dexColour = groups.dexColour;
    this.eggGroups = groups.eggGroups;

    // 5. Get optional fields
    regexp = /(?:Pre-Evolution: (?<preEvolution>[\w\:]+(?:[- ][\w\%]+)?))/;
    if (regexp.test(this.message)) {
      match = regexp.exec(this.message);
      this.preEvolution = match.groups.preEvolution;
    }
    regexp = /(?:[^-]Evolution: (?<evolutions>.+))/;
    if (regexp.test(this.message)) {
      match = regexp.exec(this.message);
      this.evolutions = match.groups.evolutions;
    }
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
    const stats = this.stats;
    console.log("HP   Atk  Def  SpA  SpD  Spe  BST");
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
    console.log(`|Dex #${this.dexNo}|Gen: ${this.genNo}|Height: ${this.height}|` +
       `Weight: ${this.weight}|Dex Colour: ${this.dexColour}|Egg Group(s): ${this.eggGroups}`);
    if (this.preEvolution && this.evolutions) {
      console.log(`Pre-Evolution: ${this.preEvolution}|Evolution(s): ${this.evolutions}`);
    }
    else if (this.preEvolution) {
      console.log(`Pre-Evolution: ${this.preEvolution}`);
    }
    else if (this.evolutions) {
      console.log(`Evolution(s): ${this.evolutions}`);
    }
    console.log(this.dexLink);
  }
}

export default PokemonMessage;