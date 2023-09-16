import Database from './DbInit';
import User from '../models/User';
import {Hashing} from '../utils/Hashing';

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
      const hashedPassword = Hashing.HashPassword(user.getPassword());
      await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
        user.getUsername(),
        user.getEmail(),
        hashedPassword
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async getUser(useremail: string): Promise<User|undefined> {
    const DatabaseInstance = Database.getInstance();
    const db = DatabaseInstance.getDb();
    try {
      if (!db) {
        throw new Error('Database connection error');
      }
      const query = 'SELECT * FROM users WHERE email = ?';
      const userRow = await new Promise<any>((resolve, reject) => {  // you need to make promise and await to that promise if you can promisify some function then you can use that function directly
        db.get(query, [useremail], (err, row) => {              // db.get is callback function so you need to promisify it
          if (err) {
            reject(err);
          }
          resolve(row);
        });
      });
     if (userRow) {
      const user = User.getInstance(userRow.username, userRow.email, userRow.password);
      return user;
      } 
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }

}
export default UserRepository;

