import {InfraestructureError} from "../utils/errors/InfraestructureError";

export class ValidationException extends InfraestructureError{
    protected readonly statusCode;

    public constructor(e: Error) {
        super(e);
        this.statusCode = 400;
    }
}