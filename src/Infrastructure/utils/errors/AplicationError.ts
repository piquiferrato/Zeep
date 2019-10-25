import { BaseError } from "./BaseError";

export class AplicationError extends BaseError{
    protected description : string;

    constructor(message : string | Object){
        super(message);
        this.description = "asd";
    }
}