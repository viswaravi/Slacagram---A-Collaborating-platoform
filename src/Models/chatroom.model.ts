import { User } from './user.model';
import { Message } from './message.model';

export class  ChatRoom {
    _id: String;
    hashTag: String;
    members: [User];
    createdBy: String;
    messages: [Message];

    constructor(id: String, hashtag: String, members: [User], createdBy: String, messages: [Message]) {
        this._id = id;
        this.hashTag = hashtag;
        this.members = members;
        this.createdBy = createdBy;
        this.messages = messages;
    }
}
