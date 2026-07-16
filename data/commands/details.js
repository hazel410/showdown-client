import {commandInterface} from "../../src/interface.js";
import {default as Dex} from "pokemon-showdown";

export class detailsCommand extends commandInterface {
  ID = 'details'
  aliases = ['details', 'dt', 'dt1', 'dt2', 'dt3', 'dt4', 'dt5', 'dt6', 'dt7', 'dt8', 'dt9'];

  init() {
    true;
  }

  handleCommand(command) {
    console.log(Dex.Dex.species.get(command.slice(3)));
  }

  getAliases() {
    return this.aliases
  }

  getID() {
    return this.ID;
  }
}