import User from "../../Domain/Entity/User";

class ShowPostCommand{
    private user: User;

    constructor(user: User){
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}

export default ShowPostCommand;
