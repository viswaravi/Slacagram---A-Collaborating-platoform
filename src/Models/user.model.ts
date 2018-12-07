import { ChatRoom } from './chatroom.model';

export class  User {
    _id: String;
    password: string;
    name: string;
    email: String;
    who: String;
    chats: [{
        to: String;
        conversation: [ChatRoom];
    }];

    constructor(id: String, password: string, name: string ,  email: String, who: String) {
        this._id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.who = who;
        this.chats = null;
    }
}
