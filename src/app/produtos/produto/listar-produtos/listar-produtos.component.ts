import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
})
export class ListarProdutosComponent implements OnInit {

  produtos$?: Observable<Produto[]>
  produtoSelecionado: string = ""

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtos$ = this.produtoService.buscarTodos()
  }

  deletar(id: number = 0): void {
    const ID = this.produtoSelecionado
    this.produtoSelecionado = ""
    this.produtoService.deletar(String(id))
      .subscribe((resposta: any) => {
        this.ngOnInit()
        alert('Produto removido com sucesso!')
      })
  }

}
