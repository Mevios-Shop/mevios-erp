import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { environment } from 'src/environments/environment';
import { ImportarVendaInterface } from '../importacao-vendas/interface/importar-venda.interface';
import { Venda } from './venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private baseUrl: string = environment.api;

  private urlVenda: string = this.baseUrl + "venda"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.urlVenda, {headers: this.composeHeaders()})
    .pipe(
      retry(10),
      map((resposta: Venda[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorCodigoPedido(codigo_pedido: string): Observable<Venda> {
    return this.http.get<Venda>(`${this.urlVenda}/${codigo_pedido}`, {headers: this.composeHeaders()})
    .pipe(
      retry(10),
      map((resposta: Venda) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  importarVendas(vendas: ImportarVendaInterface[]): Observable<Venda[]> {
    return this.http.post<Venda[]>(`${this.urlVenda}/importacao`, vendas, {headers: this.composeHeaders()})
    .pipe(
      retry(3),
      map((resposta: Venda[]) => {
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
