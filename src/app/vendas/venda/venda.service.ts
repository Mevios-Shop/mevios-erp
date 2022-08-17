import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Venda } from './venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private url: string = "http://localhost:3000/venda"

  constructor(private http: HttpClient) { }

  buscarTodas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.url)
    .pipe(
      retry(10),
      map((resposta: Venda[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId() {
    
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
