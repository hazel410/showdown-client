import {commandInterface} from "../../src/interface.js";

export class detailsCommand extends commandInterface {
  aliases = ['details', 'dt', 'dt1', 'dt2', 'dt3', 'dt4', 'dt5', 'dt6', 'dt7', 'dt8', 'dt9'];

  getCommandAliases() {
    super.getCommandAliases();
  }

  init() {
    true;
  }

  handleCommand(command) {
    console.log(Dex.pokemon.get(command.slice(3)));
  }
}