
export class  Message {
    by: String;
    text: String;
    time: Date;

    constructor(by: String, text: String, time: Date) {
        this.by = by;
        this.text = text;
        this.time = time;
    }
}
