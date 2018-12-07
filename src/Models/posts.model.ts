import { Post } from './post.model';

export class  Posts {
    _id: String;
    hashPosts: [Post];

    constructor(id: String) {
        this._id = id;
    }
}
