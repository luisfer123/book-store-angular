import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  books: Book[];

  currentPage = 0;
  pageSize = 3;
  sortBy = '';

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks(this.currentPage, this.pageSize, this.sortBy).subscribe(booksPage => {
      console.log(booksPage);
      this.books = booksPage.content;
    });
  }

}
