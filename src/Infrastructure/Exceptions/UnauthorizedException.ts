import {InfraestructureError} from "../utils/errors/InfraestructureError";

export class UnauthorizedException extends InfraestructureError{
  protected readonly statusCode = 401;

  public constructor(message: string){
    super(message);
  }
}
