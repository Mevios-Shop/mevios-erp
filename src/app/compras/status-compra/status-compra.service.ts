import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { environment } from 'src/environments/environment';
import { StatusCompra } from './status-compra.model';

@Injectable({
  providedIn: 'root'
})
export class StatusCompraService {

  private url: string = environment.api + "status_compra"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodos(): Observable<StatusCompra[]> {
    return this.http.get<StatusCompra[]>(this.url, { headers: this.composeHeaders() }).pipe(
      retry(10),
      map((resposta: StatusCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarTodos2(): Observable<StatusCompra[]> {
    return this.http.get<StatusCompra[]>(this.url, { headers: this.composeHeaders() }).pipe(
      retry(10),
      map((resposta: StatusCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<StatusCompra> {
    return this.http.get<StatusCompra>(`${this.url}/${id}`, { headers: this.composeHeaders() })
      .pipe(
        retry(10),
        map((resposta: StatusCompra) => {
          return resposta
        }),
        catchError(this.handleError)
      )
  }

  salvar(statusCompra: StatusCompra): Observable<any> {
    if (statusCompra.id !== 0) {
      return this.http.patch(`${this.url}/${statusCompra.id}`, statusCompra, { headers: this.composeHeaders() }).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else {
      return this.http.post(`${this.url}`, statusCompra, { headers: this.composeHeaders() }).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<StatusCompra> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.composeHeaders() })
      .pipe(
        map((resposta: any) => {
          return resposta
        }),
        catchError(this.handleError)
      )
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
