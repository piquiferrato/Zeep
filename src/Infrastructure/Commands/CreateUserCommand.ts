export class CreateUserCommand {

  private _username: string;
  private _password: string;
  private _isBLocked: boolean;

  public constructor(username: string, password: string, isBlocked : boolean){
      this._username = username;
      this._password = password;
      this._isBLocked = isBlocked;
  }

  public get username(): string{
    return this._username;
  }

  public get password(): string{
    return this._password;
  }

  public get isBlocked(): boolean{
    return this._isBLocked;
  }
}
