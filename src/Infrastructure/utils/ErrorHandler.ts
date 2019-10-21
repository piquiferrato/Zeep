import {injectable} from "inversify";
import {InfraestructureError} from "./errors/InfraestructureError";
import  {Response} from "express";

@injectable()
export class ErrorHandler {
    public handle(err: Error,res: Response){
        if (err instanceof InfraestructureError){
            res.status(err.getStatusCode()).send(err.message);
        }else {
            res.status(500).send("Internal sever error")
        }
    }
}
