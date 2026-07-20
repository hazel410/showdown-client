class PokemonMsg {
  message;
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
    this.message = message;
  }

  parseMessage() {

  }

  
}