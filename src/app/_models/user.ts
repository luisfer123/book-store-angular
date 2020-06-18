export class User {
    id: number;
    username: string;
    password: string;
    email: string;

    constructor(baseUser: any) {
        if(baseUser) {
            this.id = baseUser.id;
            this.username = baseUser.username;
            this.password = baseUser.password;
            this.email = baseUser.email;
        }
    }
}