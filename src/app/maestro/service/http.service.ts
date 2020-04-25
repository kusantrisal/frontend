import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  MAESTRO_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getMember() {

    const header = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('access_token'))
      .set('Access-Control-Allow-Origin', '*');

    return this.http.get(this.MAESTRO_BASE_URL + '/member/getMember', { headers: header });
  }

  createMember() {

    const header = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('access_token'))
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(this.MAESTRO_BASE_URL + '/member/createMember', { headers: header });
  }

  testApi() {
    return this.http.get('https://jsonplaceholder.typicode.com/abcusers').pipe(
      catchError(this.handleError)
    );;
  }
  handleError(error: HttpErrorResponse) {
    console.log("lalalalalalalala");
    return throwError(error);
  }
}
