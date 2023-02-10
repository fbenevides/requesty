export class Channel {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }
}