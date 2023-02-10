export class User {
  private _id: string;
  private _name: string;
  private _username: string;

  constructor(id: string, name: string, username: string) {
    this._id = id;
    this._name = name;
    this._username = username;
  }

  public get id() {
    return this._id;
  }

  public get username() {
    return this._username;
  }
}