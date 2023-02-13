import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, map, catchError, throwError } from 'rxjs';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { StatusCompra } from 'src/app/compras/status-compra/status-compra.model';
import { environment } from 'src/environments/environment';
import { StatusVenda } from './status-venda.model';

@Injectable({
  providedIn: 'root'
})
export class StatusVendaService {

  private url: string = environment.api + "status_venda_por_descricao"
  private urlStatusVenda: string = environment.api + "status_venda"

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  buscarTodos(): Observable<StatusVenda[]> {
    return this.http.get<StatusVenda[]>(this.urlStatusVenda, {headers: this.composeHeaders()})
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  buscarPorDescricao(descricao: string): Observable<StatusVenda> {
    return this.http.get<StatusVenda>(`${this.url}/${descricao}`, {headers: this.composeHeaders()})
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  deletar(id: string): Observable<StatusCompra> {
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
      // Ocorreu um erro do lado do cliente ou da rede. Trate-o em conformidade.
      console.error('Ocorreu um erro:', error.error);
    } else {
      // O backend retornou um código de resposta malsucedido.
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      console.error(
        `Código retornado de back-end ${error.status}, corpo da resposta: `, error.error);
    }
    // Retorna um observável com uma mensagem de erro voltada para o usuário.
    return throwError(() => new Error('Algo ruím aconteceu; por favor, tente novamente mais tarde.'));
  }
}
