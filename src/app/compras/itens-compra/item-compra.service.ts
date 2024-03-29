import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { environment } from 'src/environments/environment';
import { ItemCompra } from './item-compra.model';

@Injectable({
  providedIn: 'root'
})
export class ItemCompraService {

  private url: string = environment.api + "itens_compra"
  private url2: string = environment.api + "item_compra"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodos(id: string): Observable<ItemCompra[]> {
    return this.http.get<ItemCompra[]>(`${this.url}/${id}`, { headers: this.composeHeaders() })
      .pipe(
        retry(10),
        map((resposta: ItemCompra[]) => {
          return resposta
        }),
        catchError(this.handleError)
      )
  }

  buscarPorId(id: number): Observable<ItemCompra> {
    return this.http.get<ItemCompra>(`${this.url2}/${id}`, { headers: this.composeHeaders() })
      .pipe(
        retry(10),
        map((resposta: ItemCompra) => {
          return resposta
        }),
        catchError(this.handleError)
      )
  }

  salvar(itemCompra: ItemCompra, quantidade: number): Observable<ItemCompra> {

    const ITEM_COMPRA = {
      "quantidade": quantidade,
      "compra": itemCompra.compra,
      "variacao_produto": itemCompra.variacao_produto,
      "valor": itemCompra.valor,
      "status_item_compra": itemCompra.status_item_compra,
      "link_anuncio": itemCompra.link_anuncio,
      "id": itemCompra.id
    }

    if (itemCompra.id !== 0) {
      return this.http.patch(`${this.url2}/${itemCompra.id}`, itemCompra, { headers: this.composeHeaders() }).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else {

      let urlInsercao = ''

      if (quantidade == 1) {
        urlInsercao = this.url2
      } else {
        urlInsercao = this.url
      }

      return this.http.post(`${urlInsercao}`, ITEM_COMPRA, { headers: this.composeHeaders() }).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<ItemCompra> {
    return this.http.delete(`${this.url2}/${id}`, { headers: this.composeHeaders() })
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
