import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { environment } from 'src/environments/environment';
import { VariacaoProduto } from './variacao-produto.model';

@Injectable({
  providedIn: 'root'
})
export class VariacaoProdutoService {

  private url: string = environment.api + "variacoes_produto"
  private url2: string = environment.api + "variacao_produto"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodas(id_produto: number): Observable<VariacaoProduto[]> {
    console.log(`${this.url}/${id_produto}`)
    return this.http.get<VariacaoProduto[]>(`${this.url}/${id_produto}`, {headers: this.composeHeaders()}).pipe(
      retry(10),
      map((resposta: any) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<VariacaoProduto> {
    return this.http.get<VariacaoProduto>(`${this.url2}/${id}`, {headers: this.composeHeaders()})
    .pipe(
      map((resposta: VariacaoProduto) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  salvar(variacaoProduto: VariacaoProduto): Observable<any> {
  
    if (variacaoProduto.id !== 0) {
      //console.log("atualizar")
      return this.http.patch(`${this.url2}/${variacaoProduto.id}`, variacaoProduto, {headers: this.composeHeaders()})
      .pipe(
        map((resposta: any) => {
          return resposta
        })
      )
      .pipe(catchError(err => {
        this.handleError(err)
        return 'erro ao cadastrar produto'
        
      }))
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url2}`, variacaoProduto, {headers: this.composeHeaders()}).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
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
