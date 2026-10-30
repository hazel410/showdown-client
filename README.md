# showdown cli chat tool
lets you /dt stuff to your hearts content, now in the command line!
# requirements
node and npm are required to run this program. You must run
`npm install` in the repository directory to run the tool.
# start the client with
`node ./src/main.js`
# example usage
```
/weak water
Water:
Weaknesses: Electric, Grass
Resistances: Fire, Ice, Steel, Water
Immunities: None
########################
/dt clefairy
NFE Clefairy Fairy Cute Charm|Magic Guard|Friend Guard
HP   Atk  Def  SpA  SpD  Spe  BST
70   45   48   60   65   35   323
Dex#: 35|Generation: 1|Height: 0.6 m|Weight: 7.5 kg (20 BP)|Color: Pink|Egg Groups: Fairy|Gender: Male: 25%, Female: 75%|Pre-Evolution: Cleffa|Evolution: Clefable (Moon Stone)
https://dex.pokemonshowdown.com/pokemon/clefairy
########################
```
# extra info
the slash preceding the command is optional. Further, if you want to exit the client, type `/exit` or `/ex` (again, the preceding slash is optional).
# tested commands
- weakness: ['weak', 'weakness']
- effectiveness: ['effectiveness']
- coverage: ['cover', 'coverage']
- statcalc: ['statcalc']
- dice: ['dice']
- details: ['details', 'dt', 'dt1', 'dt2', 'dt3', 'dt4', 'dt5', 'dt6', 'dt7', 'dt8', 'dt9']
- dexsearch: ['dexsearch', 'ds', 'nds', 'ds1', 'ds2', 'ds3', 'ds4', 'ds5', 'ds6', 'ds7', 'ds8', 'ds9']
- movesearch: ['movesearch', 'ms', 'nms', 'ms1', 'ms2', 'ms3', 'ms4', 'ms5', 'ms6', 'ms7', 'ms8', 'ms9']
- itemsearch: ['itemsearch', 'is', 'is1', 'is2', 'is3', 'is4', 'is5', 'is6', 'is7', 'is8', 'is9']
- abilitysearch: ['abilitysearch', 'as', 'as1', 'as2', 'as3', 'as4', 'as5', 'as6', 'as7', 'as8', 'as9']
- learn: ['learn', 'learnlc', 'learnall', 'learn1', 'learn2', 'learn3', 'learn4', 'learn5', 'learn6', 'learn7', 'learn8', 'learn9']
- randompokemon: ['randompokemon', 'randpoke']
- randommove: ['randommove', 'randmove']
- randomitem: ['randomitem', 'randitem']
- randomability: ['randomability', 'randability']
- randomtype: ['randomtype', 'randtype']
