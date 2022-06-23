import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VariacaoProduto } from '../variacao-produto.model';
import { VariacaoProdutoService } from '../variacao-produto.service';

@Component({
  selector: 'app-listar-variacoes-produto',
  templateUrl: './listar-variacoes-produto.component.html',
  styleUrls: ['./listar-variacoes-produto.component.css']
})
export class ListarVariacoesProdutoComponent implements OnInit {

  idVariacaoSelecionada?: string
  idProduto: number = 0

  variacoesProduto: VariacaoProduto[] = []

  variacaoProdutoSelecionada: string = ""

  constructor(private activatedRoute: ActivatedRoute, private variacaoProdutoService: VariacaoProdutoService) { 
    activatedRoute.url.subscribe((url) => {
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.listar(params['id_produto'])
      this.idProduto = params['id_produto']
    });
  }

  listar(id_produto: number): void {
    this.variacaoProdutoService.buscarTodas(id_produto).subscribe((resposta: VariacaoProduto[]) => {
      this.variacoesProduto = resposta
    })
  }

}
