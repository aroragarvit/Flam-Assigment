class Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  available: boolean;

  constructor(id: number, title: string, author: string, genre: string, price: number, available: boolean) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.available = available;
  }
}

export default Book;
