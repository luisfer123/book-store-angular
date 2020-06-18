export class Book {
    id: number;
    name: string;
    author: string;
    price: number;

    constructor(baseBook: any) {
        this.id = baseBook.id;
        this.name = baseBook.name;
        this.author = baseBook.author;
        this.price = baseBook.price;
    }
}