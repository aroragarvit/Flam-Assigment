import Database from './DbInit';
import User from '../models/User';

class UserRepository {
  public async addUser(user: User): Promise<void> {
    // passing user object of type User
    const DatabaseInstance = Database.getInstance();
    const db = DatabaseInstance.getDb();
    try {
      if (!db) {
        throw new Error('Database connection error');
      }
      if (!user) {
        throw new Error('User object is undefined');
      }
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
        user.getUsername(),
        user.getEmail(),
        user.getPassword(),
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async getUser(useremail: string): Promise<void> {
    const DatabaseInstance = Database.getInstance();
    const db = DatabaseInstance.getDb();
    try {
      if (!db) {
        throw new Error('Database connection error');
      }
      const user = db.run('SELECT * FROM users WHERE email = ?', [useremail]);

      console.log(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
export default UserRepository;
