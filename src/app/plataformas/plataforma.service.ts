import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Plataforma } from './plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private url: string = "http://localhost:3000/plataformas"
  private url2: string = "http://localhost:3000/plataforma-descricao"

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(this.url).pipe(
      retry(10),
      map((resposta: Plataforma[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarTodos2(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(this.url).pipe(
      retry(10),
      map((resposta: Plataforma[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.url}/${id}`)
    .pipe(
      retry(10),
      map((resposta: Plataforma) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarId(id: number): Observable<number> {
    return this.http.get<Plataforma>(`${this.url}/${id}`)
    .pipe(
      retry(10),
      map((resposta: any) => {
        return resposta['id']
      }),
      catchError(this.handleError)
    )
  }

  buscarPorDescricao(descricao: string): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.url2}/${descricao}`)
  }

  salvar(plataforma: Plataforma): Observable<any> {
    
    if (plataforma.id !== 0) {
      //console.log("atualizar")
      return this.http.patch(`${this.url}/${plataforma.id}`, plataforma).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url}`, plataforma).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<Plataforma> {
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
