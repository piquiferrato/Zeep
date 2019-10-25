import {injectable} from "inversify";

@injectable()
export class ValidatorService {
    public validate = (schema: any, data: object): Promise<object> => {
        return schema.validateAsync(data);
    }
}