import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-listar-estoque',
  templateUrl: './listar-estoque.component.html',
  styleUrls: ['./listar-estoque.component.css']
})
export class ListarEstoqueComponent implements OnInit {

  produtosDisponiveis: any[] = []

  produtoSelecionado: string = ""

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(): void {
    this.estoqueService.buscarTodosAgrupados().subscribe((resposta: any[]) => {
      this.produtosDisponiveis = resposta
    })
  }

}
