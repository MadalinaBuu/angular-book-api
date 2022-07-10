import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  readonly bookAPIUrl = "https://localhost:7284/api";

  constructor(private http: HttpClient) { }

  //Books
  getBookList():Observable<any[]>{
    var full = this.bookAPIUrl + '/books';
    return this.http.get<any>(full);
  }

  addBook(data: any){
    return this.http.post(this.bookAPIUrl + '/books', data);
  }

  updateBook(id:number|string, data:any){
    return this.http.put(this.bookAPIUrl + `/books/${id}`, data);
  }

  deleteBook(id:number|string) {
    return this.http.delete(this.bookAPIUrl + `/books/${id}`);
  }
  
  //Book Types
  getBookTypesList():Observable<any[]>{
    return this.http.get<any>(this.bookAPIUrl + '/booktypes');
  }

  addBookTypes(data: any){
    return this.http.post(this.bookAPIUrl + 'booktypes', data);
  }

  updateBookTypes(id:number|string, data:any){
    return this.http.put(this.bookAPIUrl + `/booktypes/${id}`, data);
  }

  deleteBookTypes(id:number|string) {
    return this.http.delete(this.bookAPIUrl + `/booktypes/${id}`);
  }

  //Statuses
  getStatusList():Observable<any[]>{
    return this.http.get<any>(this.bookAPIUrl + '/status');
  }

  addStatus(data: any){
    return this.http.post(this.bookAPIUrl + 'status', data);
  }

  updateStatus(id:number|string, data:any){
    return this.http.put(this.bookAPIUrl + `/status/${id}`, data);
  }

  deleteStatus(id:number|string) {
    return this.http.delete(this.bookAPIUrl + `/status/${id}`);
  }
}
