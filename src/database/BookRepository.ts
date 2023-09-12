import Book from '../models/Book';
import Database from './DbInit';
import { Database as sqlitedatabase } from 'sqlite3';

class BookRepository {
  db: sqlitedatabase | null;

  constructor() {
    const DatabaseInstance = Database.getInstance();
    const db = DatabaseInstance.getDb();
    this.db = db;
  }

  public async addBook(book: Book): Promise<void> {
    this.db?.run('INSERT INTO books (title, author, genre, price, available) VALUES (?, ?, ?, ?, ?)', [
      book.title,
      book.author,
      book.genre,
      book.price,
      book.available,
    ]);
  }

  public getBook(bookId: number): Book | null {
    let book: Book | null = null;
    this.db?.get('SELECT * FROM books WHERE id = ?', [bookId], (err, row: any) => {
      if (err) {
        throw err;
      }
      book = new Book(row.id, row.title, row.author, row.genre, row.price, row.available);
      return book;
    });
    return book;
  }
}

export default BookRepository;
