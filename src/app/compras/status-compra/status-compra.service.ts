import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { StatusCompra } from './status-compra.model';

@Injectable({
  providedIn: 'root'
})
export class StatusCompraService {

  private url: string = "http://localhost:3000/status_compra"

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<StatusCompra[]> {
    return this.http.get<StatusCompra[]>(this.url).pipe(
      retry(10),
      map((resposta: StatusCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarTodos2(): Observable<StatusCompra[]> {
    return this.http.get<StatusCompra[]>(this.url).pipe(
      retry(10),
      map((resposta: StatusCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<StatusCompra> {
    return this.http.get<StatusCompra>(`${this.url}/${id}`)
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
      //console.log("atualizar")
      return this.http.patch(`${this.url}/${statusCompra.id}`, statusCompra).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url}`, statusCompra).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<StatusCompra> {
    return this.http.delete(`${this.url}/${id}`)
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
