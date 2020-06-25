import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../_models/book';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks(pageNumber: number, pageSize: number, sortBy: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('sortBy', sortBy);

    return this.httpClient.get<any>(`${environment.apiUrl}/api/v1/books`, {params: params})
      .pipe(map((booksPage) => {
           booksPage.content = booksPage.content.map(book => new Book(book));
           return booksPage;
        }
      ));
  }

  getBook(bookId: number): Observable<Book> {
    console.log('book id is: ' + bookId);
    return this.httpClient.get<Book>(`${environment.apiUrl}/api/v1/books/${bookId}`)
      .pipe(map(book => new Book(book))
    );
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
