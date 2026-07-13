const {Dex} = require('pokemon-showdown');
const readLine = require('readline');

const TEXT_LINE = '########################\n';
const readInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

function recursivePrompt() {
  readInterface.question(TEXT_LINE, (command) => {
    if ((command.toLowerCase() === 'exit') | (command.toLowerCase() === '/exit')) {
      readInterface.close();
      return;
    } else {
      console.log(Dex.species.get('chimchar'));
      recursivePrompt();
    }
  });
}

recursivePrompt();
