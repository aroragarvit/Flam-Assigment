class User{
    constructor(
        private id: number,
        private name: string,
        private email: string,
        private password: string,
    )
    {}
    public getId(): number{
        return this.id;
    }
    public getName(): string{
        return this.name;
    }
    public getEmail(): string{
        return this.email;
    }
    public getPassword(): string{
        return this.password;
    }
}
export default User;