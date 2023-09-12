import { sqlite3, Database as sqlitedatabase } from 'sqlite3';

const dbPath = './src/database/db.sqlite';

class Database {
  private static instance: Database | null = null; // static property to hold the singleton instance of the Database class
  private db: sqlitedatabase | null = null;

  private constructor() {
    // constructor is private so that no one can create an instance of this class from outside
    if (!Database.instance) {
      // Create a new SQLite database connection
      this.db = new sqlitedatabase(dbPath, (err: Error | null) => {
        if (err) {
          console.error(err.message);
          throw err;
        } else {
          console.log('Connected to the SQLite database.');
        }
      });

      // Initialize the database tables
      if (this.db) {
        this.db.run(
          `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )
            `,
          (err) => {
            if (err) {
              console.error('Error creating "users" table:', err.message);
            } else {
              console.log('Created "users" table.');
            }
          }
        );
      }

      // Assign this instance to the Singleton property
      Database.instance = this;
    }

    // Return the Singleton instance
    return Database.instance as Database;
  }

  public getDb(): sqlitedatabase | null {
    return this.db;
  }

  public static getInstance(): Database {
    // Its a static method means it can be called without creating an instance of the class and it returns the instance if it exits otherwise create an isntance itself and returns it
    // Check if an instance already exists, and create one if it doesn't
    if (!Database.instance) {
      Database.instance = new Database(); // if instance is null then create an instance of the class and assign it to the static property using the constructor
    } // Benefit of this is that you dont create new object  everywhere but you can access the same instance everywhere in the code

    return Database.instance;
  }

  public close(): void {
    if (this.db) {
      // Close the database connection
      this.db.close((err: Error | null) => {
        if (err) {
          console.error('Error closing the database:', err.message);
        } else {
          console.log('Database connection closed.');
        }
      });
    }
  }
}

export default Database;
