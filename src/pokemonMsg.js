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
    // 1. Get type(s)
    let regexp = new RegExp("types\/(\w*)", "g");
    let results = [...this.message.matchAll(regexp)];
    this.types = [results[0][0], results[1][0]];
    // 2. Get smogon link
    regexp = new RegExp("(https://dex.pokemonshowdown.com\/pokemon\/\w*)", "g");
    results = this.message.match(regexp);
    this.dexLink = results[0];
    
    // 3. Strip html tags for easier parsing
    const striptags = new RegExp("<[^>]*>", "g");
    const replaceStr = '';
    this.message = this.message.replaceAll(striptags, replaceStr);
    return this.message;
  }
}

export default PokemonMsg;