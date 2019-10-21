class ShowPostCommand{
    private userId: number;

    constructor(userId: number) {
        this.userId = userId;
    }

    getUserId() {
        return this.userId;
    }
}

export default ShowPostCommand;
