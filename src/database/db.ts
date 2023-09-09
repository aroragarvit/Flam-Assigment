import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'db.sqlite');

class Database {
    private static instance: Database | null = null;   // static property to hold the singleton instance of the Database class
    private db: sqlite3.Database | null = null;

    private constructor() {                                           // constructor is private so that no one can create an instance of this class from outside
        if (!Database.instance) {
            // Create a new SQLite database connection
            this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Connected to the SQLite database.');
                }
            });

            // Initialize the database tables
            if (this.db) {
                this.db.serialize(() => {
                  if (this.db)
                    this.db.run(`
                        CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT UNIQUE NOT NULL,
                            password TEXT NOT NULL
                        )
                    `);
                    // Add other table definitions as needed
                });
            }

            // Assign this instance to the Singleton property
            Database.instance = this;
        }

        // Return the Singleton instance
        return Database.instance as Database;
    }

    public static getInstance(): Database {                                         // Its a static method means it can be called without creating an instance of the class and it returns the instance if it exits otherwise create an isntance itself and returns it 
        // Check if an instance already exists, and create one if it doesn't
        if (!Database.instance) {
            Database.instance = new Database();      // if instance is null then create an instance of the class and assign it to the static property using the constructor                  
        }

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

