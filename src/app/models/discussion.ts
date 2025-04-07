import {User} from "./User";
import {Chat} from "./chat";

export interface Discussion{
  _id  : any,
  receiverId : any,
  senderId : any,
  receiver : User | undefined,
  sender : User | undefined,
  text : string,
  isSelected : boolean,
  lastMessage : Chat | undefined
}
