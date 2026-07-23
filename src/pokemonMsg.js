class PokemonMsg extends Message {
  pkmnTier;
  pkmnName;
  pkmnTypes;
  pkmnAbility1;
  pkmnAbility2;
  pkmnAbilityHidden;
  pkmnStats;  // [HP, Atk, Def, SpA, SpD, Spe, BST]
  pkmnDexNo;
  pkmnGenNo;
  pkmnHeight;
  pkmnWeight;
  pkmnDexColour;
  pkmnEggGroups;
  pkmnPreEvolution;
  pkmnEvolutions;

  constructor(message) {
    super(message);
  }

  parseMessage() {
    // 1. Get type(s)

    // 2. Get smogon link

    // 3. Strip html tags for easier parsing
    const striptags = new RegExp("<[^>]*>", "g");
    const replaceStr = '';
    this.message = this.message.replaceAll(striptags, replaceStr);
    return this.message;
  }

  
}