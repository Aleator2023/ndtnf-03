import { Book } from './book.interface';

export abstract class BooksRepository {
    abstract createBook(book: Book): void;
    abstract getBook(id: string): Book | null;
    abstract getBooks(): Book[];
    abstract updateBook(id: string, book: Book): void;
    abstract deleteBook(id: string): void;
}