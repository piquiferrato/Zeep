export class LoginCommand {

    private readonly username: string;
    private readonly password: string;

    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    get getUsername(): string {
        return this.username;
    }
    get getPassword(): string {
        return this.password;
    }
}