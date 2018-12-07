export class  Post {
    _id: String;
    hashtag: string;
    type: string;
    content: string;
    image: File;
    title: string;
    by: string;
    path: String;
    constructor(id: String,  hashtag: string, type: string, content: string, image: File, title: string, by: string  , path: string) {
        this._id = id;
        this.hashtag = hashtag;
        this.type = type;
        this.content = content;
        this.image = image;
        this.title = title;
        this.by = by;
        this.path = path;
    }
}
