import {BaseError} from "./BaseError";

export class InfraestructureError extends BaseError{
    protected statusCode: number;

    constructor(message: string | Object) {
        super(message);
    }

    public getStatusCode(): number {
        return this.statusCode
    }

}