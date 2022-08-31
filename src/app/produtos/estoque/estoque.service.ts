import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { ItemCompra } from 'src/app/compras/itens-compra/item-compra.model';
import { Estoque } from './estoque.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private url_estoque_disponivel: string = "http://localhost:3000/estoque_disponivel"
  private url: string = "http://localhost:3000/estoque"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodosAgrupados(): Observable<any[]> {
    
    return this.http.get<any[]>(this.url_estoque_disponivel, { headers: this.composeHeaders() })
    .pipe(
      retry(10),
      map((resposta: any[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  converterItensCompraEmListaEstoque(itens_compra: ItemCompra[]): Estoque[] {

    let listaEstoque: Estoque[] = []

    itens_compra.forEach(item => {
      const estoque: Estoque = new Estoque(
        item, item.variacao_produto, item.compra.data
      )

        listaEstoque.push(estoque)

        
    });

    return listaEstoque

  }

  //Observable<Estoque[]>
  lancarItensPorCompraId(itens_compra: ItemCompra[]): Observable<Estoque[]> {
    const LISTA_ESTOQUE: Estoque[] = this.converterItensCompraEmListaEstoque(itens_compra)
    return this.http.post<Estoque[]>(`${this.url}`, LISTA_ESTOQUE, {headers: this.composeHeaders()})    
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
