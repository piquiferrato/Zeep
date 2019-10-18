import ShowPostCommand from "../../Infrastructure/Commands/ShowPostCommand";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import Post from "../Entity/Post";

class ShowPostsService {

    public async execute(command: ShowPostCommand): Promise<Post[]> {

        const user: User = command.getUser()

        if(user.hasRole(Roles.VIEWER)){
            return Post.find();
        }

        return Post.find({relations: ['comment']});
    }
}

export default ShowPostsService;
