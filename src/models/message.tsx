export class Message {
  private _id: string;
  private _title: string;
  private _content: string;
  private _timestamp: string;

  constructor(id: string, title: string, content: string) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._timestamp = Date.now().toString();
  }
  public get timestamp() {
    return this._timestamp;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get content() {
    return this._content;
  }

  public static fromData(eventName: string, data: any) {
    const randomId = Math.random().toFixed(1);
    return new Message(randomId, eventName, data);
  }
}