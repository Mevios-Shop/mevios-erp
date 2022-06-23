import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ItemCompra } from './item-compra.model';

@Injectable({
  providedIn: 'root'
})
export class ItemCompraService {

  private url: string = "http://localhost:3000/itens_compra"
  private url2: string = "http://localhost:3000/item_compra"

  constructor(private http: HttpClient) { }

  buscarTodos(id: string): Observable<ItemCompra[]> {
    return this.http.get<ItemCompra[]>(`${this.url}/${id}`)
    .pipe(
      retry(10),
      map((resposta: ItemCompra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<ItemCompra> {
    return this.http.get<ItemCompra>(`${this.url2}/${id}`)
    .pipe(
      retry(10),
      map((resposta: ItemCompra) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  salvar(itemCompra: ItemCompra, quantidade: number): Observable<ItemCompra> {

    //console.log('ITEM_COMPRA: ', itemCompra)

    
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
      //console.log("atualizar")
      return this.http.patch(`${this.url2}/${itemCompra.id}`, itemCompra).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{

      let urlInsercao = ''

      if (quantidade == 1) {
        urlInsercao = this.url2
      } else {
        urlInsercao = this.url
      }
      //console.log("inserir")
      return this.http.post(`${urlInsercao}`, ITEM_COMPRA).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<ItemCompra> {
    return this.http.delete(`${this.url2}/${id}`)
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
