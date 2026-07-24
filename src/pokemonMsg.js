import {Message} from "./message.js";
export class PokemonMsg extends Message {
  tier;
  name;
  types;
  ability1;
  ability2;
  abilityHidden;
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

  parseMessage() {
    //console.log(this.message);

    // 1. Get type(s)
    let regex = /(\/types\/(?<type>\w*))/g;
    let results = [...this.message.matchAll(regex)];
    if (results.length > 1) {
      this.types = results[0].groups.type + "/" + results[1].groups.type;
    } 
    else {
      this.types = results[0].groups.type
    }

    // 2. Get smogon link
    regex = /(?<link>https:\/\/dex.pokemonshowdown.com\/pokemon\/\w+)/g;
    //regexp = new RegExp("(?<link>https:\/\/dex.pokemonshowdown.com\/pokemon\/(?<name>\w+))", "g");
    results = regex.exec(this.message);
    this.dexLink = results.groups.link;

    // 3. Strip html tags for easier parsing
    const striptags = new RegExp("<[^>]*>", "g");
    const replaceStr = '';
    this.message = this.message.replaceAll(striptags, replaceStr);
    // 4. Get all non-optional fields
    regex = /\/raw (?<tier>\w+)  (?<name>\w+(?: \w+)?)  (?<ability1>[A-Z]{1}[a-z]+(?: [A-Z]{1}[a-z]+)?)(?<ability2>[A-Z]{1}[a-z]+(?: [A-Z]{1}[a-z]+)?)?(?<ability3>[A-Z]{1}[a-z]+(?: [A-Z]{1}[a-z]+)?)?.*?HP(?<HP>[0-9]+) Atk(?<Atk>[0-9]+) Def(?<Def>[0-9]+) SpA(?<SpA>[0-9]+) SpD(?<SpD>[0-9]+) Spe(?<Spe>[0-9]+) BST(?<BST>[0-9]+)[\s\S]*Dex\#: (?<dexNo>[0-9]+).*Gen: (?<genNo>[0-9]+).*Height: (?<height>[0-9\.\w ]+).*Weight: (?<weight>[^\)]*\)).*Dex Colour: (?<dexColour>\w*).*Egg Group\(s\): (?<eggGroups>[^\&]*)/g;
    results = regex.exec(this.message);
    let groups = results.groups;
    this.tier = groups.tier;
    this.name = groups.name;
    this.ability1 = groups.ability1;
    if (groups.ability3) {
      this.ability2 = groups.ability2;
      this.abilityHidden = groups.ability3;
    }
    else if (groups.ability2) {
      this.abilityHidden = groups.ability2;
    }
    this.stats = [groups.HP, groups.Atk, groups.Def, groups.SpA, groups.SpD, groups.Spe, groups.BST];
    this.dexNo = groups.dexNo;
    this.genNo = groups.genNo;
    this.height = groups.height;
    this.weight = groups.weight;
    this.dexColour = groups.dexColour;
    this.eggGroups = groups.eggGroups;
    this.printInfo();
    return '';
  }

  printInfo() {
    const WS = ' '
    console.log(this.tier + WS + this.name + WS + this.types + WS + this.ability1 + this.ability2 + this.abilityHidden)
    console.log(this.stats);
    console.log(this.dexNo + WS + this.genNo + WS + this.height + WS + this.weight + WS + this.dexColour + WS + this.eggGroups);
  }
}

export default PokemonMsg;