export class UnauthorizedException extends Error{
  public constructor(message: string){
    super(message);
  }
}
