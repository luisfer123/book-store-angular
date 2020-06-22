import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../_models/book';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/api/v1/books`)
      .pipe(map((books: Book[]) => {
          return books.map(book => new Book(book));
        }
      ));
  }

  getImageBook(bookId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/v1/books/${bookId}/imageBook`);
  }

  updateBookInfo(bookId: number, updatedBook: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${environment.apiUrl}/api/v1/books/${bookId}/updateInfo`, updatedBook);
  }

  updateImage(formImageData: FormData, bookId: number) {
    return this.httpClient.put<any>(`${environment.apiUrl}/api/v1/books/${bookId}/updateImage` ,formImageData);
  }
}
