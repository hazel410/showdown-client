import {Message} from "./message.js";
export class MoveMsg extends Message {
  moveName;
  moveType;
  moveCategory;
  movePower;
  moveAccuracy;
  movePP;
  moveDescription;
  moveExtraInfo;
  
  constructor(message) {
    super(message);
  }

  parseMessage() {
    
  }
}
export default MoveMsg;