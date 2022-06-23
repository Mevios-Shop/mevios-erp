import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Plataforma } from 'src/app/plataformas/plataforma.model';
import { PlataformaService } from 'src/app/plataformas/plataforma.service';
import { Compra } from './compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private url: string = "http://localhost:3000/compras"
  private url_compras_por_status: string = "http://localhost:3000/compra-por-status"

  private plataforma?: Plataforma

  constructor(private http: HttpClient, private plataformaService: PlataformaService) { }

  buscarTodos(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.url)
    .pipe(
      retry(10),
      map((resposta: Compra[]) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorStatusCompraId(id: number): Observable<Compra[]> {
    return this.http.get<Compra>(`${this.url_compras_por_status}/${id}`)
    .pipe(
      retry(10),
      map((resposta: any) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  buscarPorId(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.url}/${id}`)
    .pipe(
      retry(10),
      map((resposta: Compra) => {
        return resposta
      }),
      catchError(this.handleError)
    )
  }

  salvar(compra: Compra): Observable<any> {

    
    const COMPRA = {
      "id": compra.id,
      "data": compra.data,
      "data_recebimento": compra.data_recebimento,
      "plataforma": compra.plataforma['id'],
      "valor_frete": compra.valor_frete,
      "desconto": compra.desconto,
      "codigo_rastreamento": compra.codigo_rastreamento,
      "codigo_pedido": compra.codigo_pedido,
      "status_compra": compra.status_compra.descricao
    }
    
    if (compra.id !== 0) {
      //console.log("atualizar")
      return this.http.patch(`${this.url}/${compra.id}`, compra).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
    else{
      //console.log("inserir")
      return this.http.post(`${this.url}`, compra).pipe(
        map((resposta: any) => {
          return resposta
        })
      )
    }
  }

  deletar(id: string): Observable<Compra> {
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
