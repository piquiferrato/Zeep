import {inject, injectable} from "inversify";
import {ValidatorService} from "../Services/ValidatorService";
import userSchema from './Schemas/UserSchemas';
import {Request} from 'express';
import {LoginCommand} from "../Commands/LoginCommand";
import {ValidationException} from "../Exceptions/ValidationException";

@injectable()
export class LoginAdapter{

    private validator;

    public constructor(@inject(ValidatorService) validator: ValidatorService){
        this.validator = validator;
    }

    public adapt = async (req :Request) => {
        try{
            const {username, password} = await this.validator.validate(userSchema, req.body);
            return new LoginCommand(username, password);
        }catch (e) {
            throw new ValidationException(e);
        }
    }
}