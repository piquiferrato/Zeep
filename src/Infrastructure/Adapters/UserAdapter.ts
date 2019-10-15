import { CreateUserCommand } from "../Commands/CreateUserCommand";
import schema from './Schemas/UserSchema';
import { HashService } from "../Services/HashService";

export class CreateUserAdapter{

  private hashService: IHashService;

  public constructor(){
    this.hashService = new HashService();
  }

  public adapt = (req: Request): CreateUserCommand => {

    const result = schema.validate(req.body)

    if(result.error){
      throw result.error;
    }

    const {name, password} = result.value;
    const hashedPassoword = this.hashService.hash(password);

    return new CreateUserCommand(name, hashedPassoword);
  }
}
