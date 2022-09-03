/*
https://docs.nestjs.com/providers#services
*/

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Security } from "./utils/security.util";


@Injectable()
export class AuthService implements CanActivate {

  private url = environment.api + 'auth';

  constructor(private router: Router, private readonly http: HttpClient) { }



  canActivate(): boolean {
    const token = Security.getToken();

    if (token && !this.tokenExpired(token)) {
      console.log('eu aqui 2')
      return true;
    }
    console.log('eu aqui 3')
    Security.clear();
    this.router.navigate(['/login']);
    return false;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  authenticate(data: any): Observable<any> {

    return this.http.post(`${this.url}/login`, data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  refreshToken(): Observable<any> {
    console.log('refreshToken');
    return this.http.post(
      `${this.url}/accounts/refresh-token`,
      null,
      { headers: this.composeHeaders() }
    )
      .pipe(
        map((res: any) => {
          console.log('refreshToken: deu certo');
          if (res) {
            Security.setUser(res.usuario);
          }
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('refreshToken: deu erro');
          return this.handleError(error);
        }));

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
