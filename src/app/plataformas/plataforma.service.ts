import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Security } from '../autenticacao/utils/security.util';
import { Plataforma } from './plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private url: string = environment.api + "plataformas"
  private url2: string = environment.api + "plataforma-descricao"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodos(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(this.url, {headers: this.composeHeaders()}).pipe(
      retry(10),
      map((resposta: Plataforma[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarTodos2(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(this.url, {headers: this.composeHeaders()}).pipe(
      retry(10),
      map((resposta: Plataforma[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.url}/${id}`, {headers: this.composeHeaders()})
    .pipe(
      retry(10),
      map((resposta: Plataforma) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarId(id: number): Observable<number> {
    return this.http.get<Plataforma>(`${this.url}/${id}`, {headers: this.composeHeaders()})
    .pipe(
      retry(10),
      map((resposta: any) => {
        return resposta['id']
      }),
      catchError(this.handleError)
    )
  }

  buscarPorDescricao(descricao: string): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.url2}/${descricao}`, {headers: this.composeHeaders()})
  }

  salvar(plataforma: Plataforma): Observable<any> {
    
    if (plataforma.id !== 0) {
      //console.log("atualizar")
      return this.http.patch(`${this.url}/${plataforma.id}`, plataforma, {headers: this.composeHeaders()}).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url}`, plataforma, {headers: this.composeHeaders()}).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<Plataforma> {
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
