import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { StatusItemCompra } from './status-item-compra.model';

@Injectable({
  providedIn: 'root'
})
export class StatusItemCompraService {

  private url: string = "http://localhost:3000/status_item_compra"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodos(): Observable<StatusItemCompra[]> {
    return this.http.get<StatusItemCompra[]>(this.url, {headers: this.composeHeaders()}).pipe(
      retry(10),
      map((resposta: StatusItemCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<StatusItemCompra> {
    return this.http.get<StatusItemCompra>(`${this.url}/${id}`, {headers: this.composeHeaders()})
    .pipe(
      retry(10),
      map((resposta: StatusItemCompra) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  

  salvar(statusItemCompra: StatusItemCompra): Observable<any> {
    
    if (statusItemCompra.id !== 0) {
      //console.log("atualizar")
      return this.http.patch(`${this.url}/${statusItemCompra.id}`, statusItemCompra, {headers: this.composeHeaders()}).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url}`, statusItemCompra, {headers: this.composeHeaders()}).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<StatusItemCompra> {
    return this.http.delete(`${this.url}/${id}`, {headers: this.composeHeaders()})
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
