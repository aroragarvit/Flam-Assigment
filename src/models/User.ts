class User {
  private static instance: User | null = null;

  private constructor(
    private username: string,
    private email: string,
    private password: string
  ) {}

  public static getInstance(username: string, email: string, password: string): User {
    if (!User.instance) {
      // If the instance doesn't exist, create one
      User.instance = new User(username, email, password);
    }
    return User.instance;
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}

export default User;