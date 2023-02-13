import { Component, OnInit } from '@angular/core';
import { Venda } from '../venda.model';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
})
export class ListarVendasComponent implements OnInit {

  vendas: Venda[] = []

  constructor(private vendaService: VendaService) { }

  ngOnInit(): void {
    this.listar()
  }

  ngOnDestroy(): void {
  }

  listar(): void {
    this.vendaService.buscarTodas()
      .subscribe((resposta: Venda[]) => {
        this.vendas = resposta
      })
  }

  deletar(id: number = 0): void {
    alert("ainda não funciona!")
  }

}
