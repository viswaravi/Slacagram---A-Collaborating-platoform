import { Message } from './message.model';

export class  ChatBoard {
    _id: String;
    members: [String];
    messages: [Message];

    constructor(id: String, members: [String], msg: [Message]) {
        this._id = id;
        this.members = members;
        this.messages = msg;
    }
}
